Ext.define('Ext.Praxis.controller.interline.IATACalendar.IATACalendarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.IATACalendarController',
    me: '',
    childs: '',
    strFechDuplicat: '',
    fileGlob: '',
    stack: [],
    bean: {},
    recPeriod: {},
    searchParams: {},
    objPermiso: {},
    PERMISO: false,
//    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'IATACalendarForm';
        prototype.url = CONTEXTPATH+'/IATACalendar';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
    },
    afterRender: function () {
        this.initDate();
        this.imgSearch_clickHandler();
        this.verificarPermisos('PX00000186');        
    },
    verificarPermisos: function(nprog) {
        Ext.Ajax.request({
            url: prototype.urlMaster+'/validateUserProgramAccess',
            method: 'POST',
            timeout: 60000000,
            params: {nprog: nprog || ''},
            success: function(response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                
                if (res.success) {
                    me.objPermiso = res.matrix;
                                        
                    if(me.objPermiso.USR.trim() === 'PMAYORGA' || me.objPermiso.USR.trim() === 'SAP01'|| me.objPermiso.USR.trim() === 'SAP43'){
                        Ext.getCmp(prototype.id + '-boxLoad').show();
                    }
                    
                } else global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue('');
//        Ext.getCmp(prototype.id+'-cmbDateFromDay').setValue('');
//        Ext.getCmp(prototype.id+'-cmbDateToDay').setValue('');
    },
    cbxDateFromYear_changeHandler: function() {
        this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function() {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    cbxDateFromDay_changeHandler: function() {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataMonth = win.getStoreDays(true);
        Ext.getCmp(prototype.id+'-cmbDateFromDay').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToDay').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    btnClose_clickHandler: function () {
        if (this.recPeriod !== undefined && this.recPeriod.FINVOIC !== '') {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to Close Period?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.closePeriod(this.recPeriod);
                    }
                }
            });
        } else {
            global.Msg({msg: 'Invalid Period Date.'});
        }
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        this.winDataEntry('M', data);
    },
    winDataEntry: function(action, data) {
        action = action === null || action === undefined ? 'V' : action;
        data = data === null || data === undefined ? {} : data;
        Ext.create('Ext.Praxis.view.interline.IATACalendarForm.DataEntry', {
            id: 'DataEntryIATACalendarForm',
            params: {
                actionCode: action,
                bean: data,
                objPermiso: me.objPermiso
            }
        }).show();
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth");
	this.bean.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth");
        
        var beanString = JSON.stringify(this.bean);
        searchParams = {
            beanString: beanString,
            bean: this.bean
        };
        
        this.search(this.bean);
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    imgExcel_clickHandler: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    imgClear_clickHandler: function(obj, e) {
        this.initDate();
    },
    imgChart_clickHandler: function() {
    },
    btnAdd_click: function () {
        this.winDataEntry('A');
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    imFavo_clickHandler: function (cmp) {
        var url = "resources/img/botones/";
        if (cmp.icon === url + "addFav2.png") {
            cmp.setIcon(url + "delFav.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Delete Favorite");
            global.Msg({ msg: 'Menu is added to favorite'});
//            this.insertFavoriteMenu(this.bean2149);	
        } else if (cmp.icon === url + "delFav.png") {
            cmp.setIcon(url + "addFav2.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Add Favorite");
            global.Msg({ msg: 'Menu is Remove to favorite'});
//            this.deleteFavoriteMenu(this.bean2149);
        }
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        Ext.Ajax.request({
            url: prototype.url + '/search',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.id + '-boxMainData').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxMainData').unmask();
                win.lblUser_toolTip("Estructura: A1851");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-gridData').bindStore(
                        Ext.create("Ext.Praxis.store.interline.GridData", { data: res.listaData })
                    );
                    if (res.listaData.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }
                    me.recPeriod = res.recPeriod;
                    if (me.recPeriod !== undefined) {
                        me.setValue('txtPERIOD', me.recPeriod.FINVOIC.trim() + ' - ' + me.recPeriod.PERIOD.trim());
                    }
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxMainData').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="closePeriod">
    closePeriod: function (recPeriod) {
        Ext.Ajax.request({
            url: prototype.url + '/closePeriod',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(recPeriod)},
            beforerequest: Ext.getCmp(prototype.id + '-boxMainData').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxMainData').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.Mensaje;
                    global.Msg({msg: msj});
                    me.recPeriod = res.recPeriod;
                    if (me.recPeriod !== undefined) {
                        me.setValue('txtPERIOD', me.recPeriod.FINVOIC.trim() + ' - ' + me.recPeriod.PERIOD.trim());
                    }
                    me.search(me.bean);
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxMainData').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    
    
    onLoadValid: function() {
        
    },
    
    onFileLoad: function(a,b,c,d,e,f) {
        
        var me = this;
        console.log(me.strFechDuplicat);
                
        if(me.strFechDuplicat === ''){
            me.fileGlob = Ext.getCmp(prototype.id + '-file').getValue();
        }
                
        if (me.fileGlob === '') {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }
        
        var form = Ext.getCmp(prototype.id + '-form-01').getForm();
//        console.log(form);
        
        
        form.submit({
            url: prototype.url + '/load_A1851',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {strFechDuplicat: me.strFechDuplicat},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                console.log(res);
                
                if (res.objResult.isDateDuplicat) {
                    if (res.duplicat) {
                        Ext.Msg.show({
                            title: '.:Confirmation:.',
                            msg: 'Record already exists, do you want to replace?',
                            buttons: Ext.MessageBox.OKCANCEL,
                            scope: this,
                            icon: Ext.MessageBox.QUESTION,
                            modal: true,
                            fn: function (btn) {
                                if (btn === 'ok') {
                                    me.strFechDuplicat = res.objResult.strDateDuplicat;
                                    me.onFileLoad();
                                }
                            }
                        });
                    }
                }else{
                    if(!res.error){
                        global.Msg({msg: ".: Successful Upload :."});
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }else{
                        global.Msg({msg: ".: Error Loading File :."});
                    }
                    
                    me.strFechDuplicat = '';
                    
                    var filefield = form.getFields().get(0);
                    filefield.setRawValue('');
                    form.reset();
                }
//                Ext.getCmp(prototype.id+'-btn-upload').enable(true);
            },
            failure: function(response, opts) {
                console.log(response);
                console.log('server-side failure with status code ' + response.status);
                global.Msg({msg: ".: Error Server :."});
            }
        });
        
        
    },
    
    exportExcel: function() {
//        global.getFile(_path);
        global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveFirst();
    },
    pagPrevious: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').movePrevious();
    },
    pagNext: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveNext();
    },
    pagLast: function(obj, e) {
        Ext.getCmp(prototype.id+'-paggin').moveLast();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function (boxId, pagginId, add) {
        global.selectedChild(this.childs, prototype.id + '-' + boxId);
        add = add === null || add === undefined ? true : add;
        if(add) this.stack.push(prototype.id + '-' + boxId);
        
        if (pagginId === null || pagginId === undefined || pagginId.length === 0) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-pie').hide();
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = Ext.getCmp(prototype.id + '-' + pagginId).getPageData();
            
            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
            var total = Ext.util.Format.number(pagData.total, '0,000');

            Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
            Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
            Ext.getCmp(prototype.id + '-lbl-total').setText(total);
            //</editor-fold>
            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-pie').show();
            
            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + boxId).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-pie').setWidth(width);
        }
    },
    peek: function () {
        return this.stack[this.stack.length - 1];
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler();
        }
    }
    // </editor-fold>
});
