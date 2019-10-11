import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { StringDecoder } from 'string_decoder';
import { ActionOutput } from '../../../../models/actionoutput';
import { RMUITreeNode } from '../../../../models/rmuitreenode';


@Component({
    selector: 'app-settings-menu-management',
    templateUrl: './menu-management.html'
})
export class MenuManagementComponent {
    selectedNode: ActionOutput;
    selectedLevel: number = undefined;
    @ViewChild('newItem', { static: true }) newItem: ElementRef;
    nodes: RMUITreeNode[] = [];
    loading: boolean = true;
    fileToUpload: File = null;
    isMenuSaving: boolean = false;
    isEdit: boolean = false;
    saveError: any = '';
    complexForm: FormGroup;
    isDisplayPopup: boolean;
    menu = {
        title: '',
        route: '',
        menu_id: '',
        img: '',
        is_active: '1',
        store_id: '',
        icon_path: null
    };
    errors = {
        title: false,
        route: false,
        menu_id: false,
        img: false,
        hasError: false,
        store_id: StringDecoder
    };
    @ViewChild('file', { static: true }) file: ElementRef;
    @ViewChild('close', { static: true }) close: ElementRef;

    constructor(private renderer: Renderer, private service: SettingsService, private sideService: SidenavService, fb: FormBuilder) {
        this.init();
    }

    init(): void {
        this.loading = true;
        this.menuReload();
        this.service.getMenus()
            .map(res => this.extractMenuItems(res))
            .subscribe(res => {
                this.loading = false;
                this.nodes = res.sort(this.sortNumber);
                this.renderer.invokeElementMethod(this.close.nativeElement, 'click');
            });
    }

    menuReload() {
        this.sideService.refreshItem(true);
    }

    sortNumber(a, b) {
        return a - b;
    }

    collapseAll(nodes?: RMUITreeNode[]): void {
        ((nodes ? nodes : this.nodes) || []).forEach(node => {
            node.collapse = false;
            if ((node.nodes || []).length) {
                this.collapseAll(node.nodes);
            }
        });
    }

    expandAllNodes(nodes?: RMUITreeNode[]): void {
        ((nodes ? nodes : this.nodes) || []).forEach(node => {
            node.collapse = true;
            if ((node.nodes || []).length) {
                this.expandAllNodes(node.nodes);
            }
        });
    }

    onRemove(data: ActionOutput): void {
        console.log('data', data);
        this.loading = true;
        this.service.delete(data.item.id).subscribe(res => {
            this.init();
        });
    }

    onAdd(data: ActionOutput): void {
        console.log('onAdd', data);
        this.selectedNode = data;
        this.selectedLevel = data.level;
        this.isDisplayPopup = true;
        this.renderer.invokeElementMethod(this.newItem.nativeElement, 'click');
    }

    addNew() {
        console.log('addNew');
        this.selectedLevel = 1;
        this.errors = {
            title: false,
            route: false,
            menu_id: false,
            img: false,
            hasError: false,
            store_id: StringDecoder
        };
        this.isDisplayPopup = true;
    }

    onDrag(data: any) {
        this.service.dragMenu(data).subscribe(res => {
            this.init();
            console.log(res);
        });
    }

    onEdit(data: ActionOutput): void {
        console.log('onEdit');
        this.onAdd(data);
        this.isDisplayPopup = true;
        this.menu.title = data.item.title;
        this.menu.route = data.item.route;
        this.menu.menu_id = data.item.id;
        this.menu.store_id = data.item.store_id;
        this.menu.icon_path = data.item.icon_path;
        console.log('aaaaaaaaaaaaaaaaaaaa', data.item.icon_path);

        this.isEdit = true;
        this.errors = {
            title: false,
            route: false,
            menu_id: false,
            img: false,
            hasError: false,
            store_id: StringDecoder
        };
    }

    onStatusChange(data: ActionOutput): void {
        this.loading = true;
        const payload = {
            menu_id: data.item.id,
            is_active: data.item.is_active === '1' ? '0' : '1'
        };
        // console.log(payload);
        this.service.changeStatus(payload).subscribe(res => {
            this.init();
        });
    }

    validateForm(): boolean {
        if (this.selectedLevel === 1) {
            this.errors.title = this.menu.title === '' ? true : false;
            this.errors.img = this.menu.img === '' && !this.isEdit ? true : false;
        } else if (this.selectedLevel === 3) {
            this.errors.title = this.menu.title === '' ? true : false;
            this.errors.route = this.menu.route === '' ? true : false;
            this.errors.menu_id = this.menu.menu_id === '' ? true : false;
        } else {
            this.errors.title = this.menu.title === '' ? true : false;
        }
        this.errors.hasError = (this.errors.title || this.errors.route || this.errors.img) ? true : false;

        return this.errors.hasError;
    }
    save(): void {
        if (!this.validateForm()) {
            this.isMenuSaving = true;
            if (!this.isEdit) {
                const body = {
                    menu_title: this.menu.title,
                    parent_menu: this.selectedNode ? this.selectedNode.item.id : '0',
                    route: this.selectedLevel === 3 ? this.menu.route : '',
                    icon: this.selectedLevel === 1 ? this.menu.img : '',
                    is_active: this.menu.is_active
                };

                this.service.create(body).subscribe(res => {
                    this.isMenuSaving = false;
                    this.init();
                }, error => {
                    this.isMenuSaving = false;
                    this.saveError = error.statusText;
                });
            } else {
                const body = {
                    menu_title: this.menu.title,
                    route: this.selectedLevel === 3 ? this.menu.route : '',
                    icon: this.selectedLevel === 1 ? this.menu.img : '',
                    is_active: this.menu.is_active,
                    store_id: this.menu.store_id,
                };

                let data = new FormData();
                data.append('menu_id', this.menu.menu_id);
                data.append('menu_title', this.menu.title);
                data.append('route', body.route);
                data.append('icon_path', this.menu.icon_path);
                data.append('store_id', body.store_id);
                // console.log('hello', body);
                // console.log('hello123', data);

                // this.service.update(body, this.selectedNode.item.id).subscribe(res => {
                //     this.isMenuSaving = false;
                //     this.init();
                // });
                this.service.editUpdate(data).subscribe(res => {
                    console.log(res);
                    this.isMenuSaving = false;
                    this.init();
                });
            }
        }
    }

    clear(): void {
        this.isDisplayPopup = false;
        this.selectedNode = null;
        this.selectedLevel = null;
        this.menu = {
            title: '',
            route: '',
            menu_id: '',
            img: '',
            is_active: '1',
            store_id: '',
            icon_path: null
        };
        this.errors = {
            title: false,
            route: false,
            menu_id: false,
            img: false,
            hasError: false,
            store_id: StringDecoder
        }
        this.isEdit = false;
        this.isMenuSaving = false;
    }

    private extractMenuItems(menu: any[]): RMUITreeNode[] {
        menu.forEach(m => {
            m.id = m.menu_id;
            m.title = m.menu_title;
            m.is_active = m.is_active;
            m.nodes = m.submenu;
            if ((m.submenu || []).length > 0) {
                this.extractMenuItems(m.submenu);
            }
        });
        return menu;
    }

    private handleFileInput(files: FileList) {
        this.menu.icon_path = files.item(0);
    }

    private imgToBase64(evt): void {
        let _this = this;
        // const reader = new FileReader();
        // reader.addEventListener('load', (e: any) => {
        //     this.menu.img = e.target.result;
        // });
        // if (this.menu.icon_path.nativeElement.files.length > 0) {
        //     reader.readAsDataURL(this.menu.icon_path.nativeElement.files[0]);
        // } else {
        //     this.menu.img = '';
        // }
        
        let f = evt.target.files[0]; // FileList object
        let reader = new FileReader();
        // Closure to capture the file information.
        // reader.onload = (function(theFile) {
        //     return function(e) {
        //     let binaryData = e.target.result;
        //     //Converting Binary Data to base 64
        //     let base64String = window.btoa(binaryData);
        //     //showing file converted to base64
        //     _this.menu.img = reader.result;
        //     alert('File converted to base64 successfuly!\nCheck in Textarea');
        //     };
        // })(f);
        
        //reader.readAsBinaryString(f);
        reader.onloadend = function() {
            _this.menu.img = reader.result.toString();
            console.log(_this.menu.img);            
          }      
        reader.readAsDataURL(f);
    }
}
