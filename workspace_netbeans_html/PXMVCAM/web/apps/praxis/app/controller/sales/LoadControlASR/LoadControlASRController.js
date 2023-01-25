Ext.define('Ext.Praxis.controller.sales.LoadControlASR.LoadControlASRController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadControlASRController',
    ControlFormatASR: Ext.create('Ext.Praxis.view.program.CtrlControlFormatASRForm', { id: 'CtrlControlFormatASRForm' }),
    ControlLoadASR: Ext.create('Ext.Praxis.view.program.CtrlControlLoadASRForm', { id: 'CtrlControlLoadASRForm' }),
    searchParams: {},
    IdFile: '',
    beanErrorFormat: {},
    bean: {},
    beanError: {},
    beanASR: {},
    lstASR: {},
    gloFilterFormatASRHOT: {},
    gloFilterASRHOT: {},
    init: function(view) {
        prototype.url = CONTEXTPATH+'/LoadControl';
        this.setValue('txtA1698FCARG', new Date());
        this.setValue('cbxFiltro', '1');
    },
    afterRender: function () {
        this.btnSearch_click('BWR');
    },
    btnFormatMasterFile_clickHandler: function () {
        this.gloFilterFormatASRHOT = {};
        this.gloFilterFormatASRHOT.IN_PROGRAM = nprog;
        
        var controller = this.ControlFormatASR.getController();
        controller.bean = this.gloFilterFormatASRHOT;
        controller.startDisplay();
        this.ControlFormatASR.show();
    },
    btnLoadASR_clickHandler: function () {
        this.gloFilterASRHOT = {};
        this.gloFilterASRHOT.IN_PROGRAM = nprog;
        
        var controller = this.ControlLoadASR.getController();
        controller.bean = this.gloFilterASRHOT;
        this.ControlLoadASR.show();
        controller.startDisplay();
    },
    cmbFiltro_clickHandler: function() {
        var tipo_fil = this.getValue("cbxFiltro");
        switch (tipo_fil) {
            case '1':
                Ext.getCmp(prototype.id+'-HBox_filter01').show();
                Ext.getCmp(prototype.id+'-Lbl_optFCARG').show();
                Ext.getCmp(prototype.id+'-txtA1698FCARG').show();
                Ext.getCmp(prototype.id+'-lblMandatorySystem').show();
                Ext.getCmp(prototype.id+'-HBox_filter02').hide();
                this.focus('txtA1698FCARG');
                break;
            case '2':
                Ext.getCmp(prototype.id+'-HBox_filter01').hide();
                Ext.getCmp(prototype.id+'-Lbl_optFCARG').hide();
                Ext.getCmp(prototype.id+'-txtA1698FCARG').hide();
                Ext.getCmp(prototype.id+'-lblMandatorySystem').hide();
                Ext.getCmp(prototype.id+'-HBox_filter02').show();
                this.setValue('txtA1698FPRDA', new Date());
                this.focus('txtA1698FPRDA');
                break;
            default:
                Ext.getCmp(prototype.id+'-HBox_filter01').hide();
                Ext.getCmp(prototype.id+'-Lbl_optFCARG').hide();
                Ext.getCmp(prototype.id+'-txtA1698FCARG').hide();
                Ext.getCmp(prototype.id+'-lblMandatorySystem').hide();
                Ext.getCmp(prototype.id+'-HBox_filter02').hide();
                break;
        }
    },
    tab_clickHandler: function() {
        var tabPanel = Ext.getCmp(prototype.id+'-tnvMain');
        var activeTab = tabPanel.getActiveTab();
        var activeTabIndex = tabPanel.items.indexOf(activeTab);
        switch (activeTabIndex) {
            case 0:
                Ext.getCmp(prototype.id+'-options').show();
                Ext.getCmp(prototype.id+'-contentFilter').show();
                Ext.getCmp(prototype.id+'-boxFilterControl1').show();
                Ext.getCmp(prototype.id+'-boxFilterControl2').hide();
                break;
            case 1:
                Ext.getCmp(prototype.id+'-options').hide();
                Ext.getCmp(prototype.id+'-contentFilter').hide();
                Ext.getCmp(prototype.id+'-boxFilterControl1').hide();
                Ext.getCmp(prototype.id+'-boxFilterControl2').hide();
                this.btnSearch_click('LOAD');
                break;
            case 2:
                Ext.getCmp(prototype.id+'-options').show();
                Ext.getCmp(prototype.id+'-contentFilter').show();
                Ext.getCmp(prototype.id+'-boxFilterControl1').hide();
                Ext.getCmp(prototype.id+'-boxFilterControl2').show();
                break;
            case 3:
                this.setValue('txtIDFile', this.IdFile);
                this.beanErrorFormat.IN_IDFIL = '000000000'+this.getValue("txtIDFile");;
                this.beanErrorFormat.IN_IDFIL = this.beanErrorFormat.IN_IDFIL.substr(this.beanErrorFormat.IN_IDFIL.length - 9);
                this.beanErrorFormat.IN_FUENT = 'ASR';
                this.searchIdFile(this.beanErrorFormat);
                break;
        }
    },
    btnSearchIDFile_clickHandler: function() {
        this.btnSearch_click('ERR_FORMAT');
    },
    gridControlLoadRep_itemClickHandler: function(obj, record, index, eOpts) {
        this.IdFile = record.get('A1698IDFIL');
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e, a) {
        if (obj.id !== 'undefined') {
            switch (obj.id) {
                case prototype.id+'-btnSearch': obj = 'BWR'; break;
                case prototype.id+'-btnSearch2': obj = 'ERR'; break;
            }
        }
        var tipo_fil = this.getValue("cbxFiltro");
        if(obj==='BWR'){
            this.bean.IN_A1698CCUST = '139';
            this.bean.IN_A1698PAIS = '';  // IATA PAISES
            this.bean.IN_A1698BANK  = ''; //BANCO (EWL, IAP, IAR) CIUDAD(BSP) , REF. TBLE: Miscelanea
            this.bean.IN_A1698FPRDA = '';
            this.bean.IN_A1698FFILE = '';
            this.bean.IN_A1698HFILE = '';
            this.bean.IN_A1698FREGI = '';
            this.bean.IN_A1698SOURC = 'ASR';
            if ( tipo_fil === '2' ) {
                this.bean.IN_A1698FPRDA = Ext.util.Format.date(this.getValue("txtA1698FPRDA"), 'Ymd');
                if (this.bean.IN_A1698FPRDA === ''){
                    global.Msg({ msg: 'Required Field, Processing Date' });
                    this.focus('txtA1698FPRDA');
                    return;
                }else{
                    this.search(this.bean,e);
                }
            }else if ( tipo_fil === '1' ){
                this.bean.IN_A1698FREGI = Ext.util.Format.date(this.getValue("txtA1698FCARG"), 'Ymd');
                if (this.bean.IN_A1698FREGI === ''){
                    global.Msg({ msg: 'Required Field, Processing Date' });
                    this.focus('txtA1698FPRDA');
                    return;
                }else{
                    this.search(this.bean,e);
                }
            }
        } else if(obj==='LOAD'){
            this.loadASR(this.beanASR);
        } else if(obj==='ERR'){
            this.beanError.IN_A1697CCUST = '139';
            this.beanError.IN_A1697PAIS = '';
            this.beanError.IN_A1697BANK  = '';
            this.beanError.IN_A1697FPRDA = '';
            this.beanError.IN_A1697FFILE = '';
            this.beanError.IN_A1697HFILE = '';
            this.beanError.IN_A1697FREGI = '';
            this.beanError.IN_A1697SOURC = 'ASR';
            if ( tipo_fil === '2' ) {
                this.beanError.IN_A1697FPRDA = this.getValue("txtA1698FPRDA");
                
                if (this.getValue("txtA1698FPRDA") === ''){
                    global.Msg({ msg: 'Required Field, Processing Date' });
                    this.focus('txtA1698FPRDA');
                    return;
                }else{
                    this.loadError(this.beanError,e);
                }
            }else if ( tipo_fil === '1' ){
                this.beanError.IN_A1697FREGI = Ext.util.Format.date(this.getValue("txtA1698FCARG"), 'Ymd');
                if (this.beanError.IN_A1697FREGI === ''){
                    global.Msg({ msg: 'Required Field, Processing Date' });
                    this.focus('txtA1698FPRDA');
                    return;
                }else{
                    this.loadError(this.beanError,e);
                }
            }
        }else if(obj==='ERR_FORMAT'){
            this.beanErrorFormat.IN_IDFIL = ('000000000'+this.getValue("txtIDFile"));
            this.beanErrorFormat.IN_IDFIL = this.beanErrorFormat.IN_IDFIL.substr(this.beanErrorFormat.IN_IDFIL.length - 9);
            this.searchIdFile(this.beanErrorFormat,e);
	}
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    btnClear_click: function(obj, e) {
        this.setValue('txtA1698FCARG', new Date());
        this.setValue('txtA1698FPRDA', new Date());
        Ext.getCmp(prototype.id+'-gridControlLoadRep').getStore().removeAll();
        this.lstASR = {};
        Ext.getCmp(prototype.id+'-gridControlLoadError').getStore().removeAll();
    },
    btnBack_click: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean, opt) {
        if (opt === 'XLS') {
            this.exportExcel('/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
            return;
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.LoadControlASR.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin3">
                    var pag = Ext.getCmp(prototype.id+'-paggin3');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage3').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount3').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total3').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridControlLoadRep').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin3').bindStore(storeGridDatas);
    },
    exportExcel: function(_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + _path);
                }
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="loadASR">
    loadASR: function(beanASR) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
            proxy: {
                url: prototype.url+'/loadASR'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanASR;
                    Ext.getCmp(prototype.id+'-LoadControl1').mask('Loading...', '');
                },
                load: function(obj) {
                    win.lblUser_toolTip("Estructura: A1536");
                    // <editor-fold defaultstate="collapsed" desc="paggin4">
                    var pag = Ext.getCmp(prototype.id+'-paggin4');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage4').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount4').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total4').setText(total);
                    // </editor-fold>
                    var strTexto = '';
                    if (obj.data.length > 0) {
                        me.lstASR = obj.data.items;
                        for (var i = 0; i < me.lstASR.length; i++) {
                            me.beanASR = me.lstASR[i].data;
                            strTexto += me.beanASR.DELIVERY;
                            strTexto += '\n';
                        }
                        me.setValue('txaDelivery', me.getValue("txaDelivery")+strTexto);
                    } else {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    Ext.getCmp(prototype.id+'-LoadControl1').unmask('Loading...', '');
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-paggin4').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="loadError">
    loadError: function(beanError, opt) {
        if (opt === 'XLS') {
            this.exportExcel('/getXLSX_err?beanString=' + encodeURI(JSON.stringify(beanError)));
            return;
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.LoadControlASR.GridDataError', {
            proxy: {
                url: prototype.url+'/loadError'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanError;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin5">
                    var pag = Ext.getCmp(prototype.id+'-paggin5');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage5').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount5').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total5').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridControlLoadError').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin5').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchIdFile">
    searchIdFile: function(beanErrorFormat, opt) {
        if (opt === 'XLS') {
            this.exportExcel('/getXLSX_err_format?beanString=' + encodeURI(JSON.stringify(beanErrorFormat)));
            return;
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.LoadControlASR.GridDataIdFile', {
            proxy: {
                url: prototype.url+'/searchIdFile'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanErrorFormat;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin2">
                    var pag = Ext.getCmp(prototype.id+'-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total2').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridErrorsFormat').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="processFormatASRHOT">
    processFormatASRHOT: function (bean) {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.url+'/processFormatASRHOT',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('CtrlControlFormatASRForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('CtrlControlFormatASRForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me1.gloFilterFormatASRHOT = res.filter;
                    var controller = me1.ControlFormatASR.getController();
                    controller.bean = me1.gloFilterFormatASRHOT;
                    if(me1.gloFilterFormatASRHOT.OU_STATUS === '0'){
                        controller.displayMesagge(controller.PROCESS_OK);
                    }else if(me1.gloFilterFormatASRHOT.OU_STATUS === '1'){
                        controller.displayMesagge(controller.PROCESS_ERROR);
                    }else if(me1.gloFilterFormatASRHOT.OU_STATUS === '2'){
                        controller.displayMesagge(controller.PROCESS_DUPLICADO);
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('CtrlControlFormatASRForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="processLoadASRHOT">
    processLoadASRHOT: function (bean) {
        var me1 = this;
        Ext.Ajax.request({
            url: prototype.url+'/processLoadASRHOT',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp('CtrlControlLoadASRForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('CtrlControlLoadASRForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me1.gloFilterASRHOT = res.filter;
                    var controller = me1.ControlLoadASR.getController();
                    controller.bean = me1.gloFilterASRHOT;
                    if(me1.gloFilterASRHOT.OU_STATUS === '0'){
                        controller.displayMesagge(controller.PROCESS_OK);
                    }else {
                        controller.displayMesagge(controller.PROCESS_ERROR);
                    }
                } else global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('CtrlControlLoadASRForm').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    
    getIndexTabSelected: function() {
        var tabPanel = Ext.getCmp(prototype.id+'-tnvMain');
        var activeTab = tabPanel.getActiveTab();
        var activeTabIndex = tabPanel.items.indexOf(activeTab);
        return activeTabIndex;
    },
    txtFilterValue_keyDownHandler: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            var selectedIndex = this.getIndexTabSelected();
            switch (selectedIndex) {
                case 0:
                    this.btnSearch_click('BWR');
                    break;
                case 1:
                    this.btnSearch_click('LOAD');
                    break;
                case 2:
                    this.btnSearch_click('ERR');
                    break;
            }
        }
    },

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (this.getIndexTabSelected() === 0) {
            Ext.getCmp(prototype.id+'-paggin3').moveFirst();
        } else if (this.getIndexTabSelected() === 2) {
            Ext.getCmp(prototype.id+'-paggin5').moveFirst();
        } else if (this.getIndexTabSelected() === 3) {
            Ext.getCmp(prototype.id+'-paggin2').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (this.getIndexTabSelected() === 0) {
            Ext.getCmp(prototype.id+'-paggin3').movePrevious();
        } else if (this.getIndexTabSelected() === 2) {
            Ext.getCmp(prototype.id+'-paggin5').movePrevious();
        } else if (this.getIndexTabSelected() === 3) {
            Ext.getCmp(prototype.id+'-paggin2').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (this.getIndexTabSelected() === 0) {
            Ext.getCmp(prototype.id+'-paggin3').moveNext();
        } else if (this.getIndexTabSelected() === 1) {
            Ext.getCmp(prototype.id+'-paggin4').moveNext();
        } else if (this.getIndexTabSelected() === 2) {
            Ext.getCmp(prototype.id+'-paggin5').moveNext();
        } else if (this.getIndexTabSelected() === 3) {
            Ext.getCmp(prototype.id+'-paggin2').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (this.getIndexTabSelected() === 0) {
            Ext.getCmp(prototype.id+'-paggin3').moveLast();
        } else if (this.getIndexTabSelected() === 2) {
            Ext.getCmp(prototype.id+'-paggin5').moveLast();
        } else if (this.getIndexTabSelected() === 3) {
            Ext.getCmp(prototype.id+'-paggin2').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
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
            this.btnSearch_click();
        }
    },
    // </editor-fold>
    
    btnExcel_click: function() {
        var selectedIndex = this.getIndexTabSelected();
        switch (selectedIndex) {
            case 0:
                this.btnSearch_click('BWR', 'XLS');
                break;
            case 2:
                this.btnSearch_click('ERR', 'XLS');
                break;
            case 3:
                this.btnSearch_click('ERR_FORMAT', 'XLS');
                break;
        }
    }
});
