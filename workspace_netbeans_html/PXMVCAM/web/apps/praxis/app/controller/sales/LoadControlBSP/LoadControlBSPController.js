Ext.define('Ext.Praxis.controller.sales.LoadControlBSP.LoadControlBSPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadControlBSPController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    me: '',
    IdFile: '',
    beanErrorFormat: {},
    bean: {},
    beanError: {},
    beanHOT: {},
    lstHOT: {},
    // </editor-fold>
    init: function(view) {
        me = this;
        // <editor-fold defaultstate="collapsed" desc="prototype">
        prototype.id = 'LoadControlBSPForm';
        prototype.url = CONTEXTPATH + '/LoadControl';
        prototype.widthContenedor = 1300;
        prototype.widthGrid = 1200;
        // </editor-fold>
        this.setValue('txtA1698FCARG', new Date());
        this.setValue('cbxFiltro', '1');
        this.focus('txtA1698BANK');
    },
    afterRender: function() {
        this.btnSearch_click('BWR');
    },
    cmbFiltro_clickHandler: function() {
        var tipo_fil = this.getValue("cbxFiltro");
        switch (tipo_fil) {
            case '1':
                Ext.getCmp(prototype.id + '-HBox_filter01').show();
                Ext.getCmp(prototype.id + '-Lbl_optFCARG').show();
                Ext.getCmp(prototype.id + '-txtA1698FCARG').show();
                Ext.getCmp(prototype.id + '-lblMandatorySystem').show();
                Ext.getCmp(prototype.id + '-HBox_filter02').hide();
                this.focus('txtA1698FCARG');
                break;
            case '2':
                Ext.getCmp(prototype.id + '-HBox_filter01').hide();
                Ext.getCmp(prototype.id + '-Lbl_optFCARG').hide();
                Ext.getCmp(prototype.id + '-txtA1698FCARG').hide();
                Ext.getCmp(prototype.id + '-lblMandatorySystem').hide();
                Ext.getCmp(prototype.id + '-HBox_filter02').show();
                this.setValue('txtA1698FPRDA', new Date());
                this.focus('txtA1698FPRDA');
                break;
            default:
                Ext.getCmp(prototype.id + '-HBox_filter01').hide();
                Ext.getCmp(prototype.id + '-Lbl_optFCARG').hide();
                Ext.getCmp(prototype.id + '-txtA1698FCARG').hide();
                Ext.getCmp(prototype.id + '-lblMandatorySystem').hide();
                Ext.getCmp(prototype.id + '-HBox_filter02').hide();
                break;
        }
    },
    tab_clickHandler: function() {
        var tabPanel = Ext.getCmp(prototype.id + '-tnvMain');
        var activeTab = tabPanel.getActiveTab();
        var activeTabIndex = tabPanel.items.indexOf(activeTab);
        switch (activeTabIndex) {
            case 0:
                Ext.getCmp(prototype.id + '-options').show();
                Ext.getCmp(prototype.id + '-contentFilter').show();
                Ext.getCmp(prototype.id + '-boxFilterControl1').show();
                Ext.getCmp(prototype.id + '-boxFilterControl2').hide();
                break;
            case 1:
                Ext.getCmp(prototype.id + '-options').hide();
                Ext.getCmp(prototype.id + '-contentFilter').hide();
                Ext.getCmp(prototype.id + '-boxFilterControl1').hide();
                Ext.getCmp(prototype.id + '-boxFilterControl2').hide();
                this.btnSearch_click('LOAD');
                break;
            case 2:
                Ext.getCmp(prototype.id + '-options').show();
                Ext.getCmp(prototype.id + '-contentFilter').show();
                Ext.getCmp(prototype.id + '-boxFilterControl1').hide();
                Ext.getCmp(prototype.id + '-boxFilterControl2').show();
                this.btnSearch_click('ERR');
                break;
            case 3:
                this.setValue('txtIDFile', this.IdFile);
                this.beanErrorFormat.IN_IDFIL = '000000000' + this.getValue("txtIDFile");
                this.beanErrorFormat.IN_IDFIL = this.beanErrorFormat.IN_IDFIL.substr(this.beanErrorFormat.IN_IDFIL.length - 9);
                this.beanErrorFormat.IN_FUENT = 'BSP';
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
                case prototype.id + '-btnSearch':
                    obj = 'BWR';
                    break;
                case prototype.id + '-btnSearch2':
                    obj = 'ERR';
                    break;
            }
        }
        var tipo_fil = this.getValue("cbxFiltro");
        if (obj === 'BWR') {
            this.bean.IN_A1698CCUST = '139';
            this.bean.IN_A1698PAIS = '';
            this.bean.IN_A1698BANK = '';
            this.bean.IN_A1698FPRDA = '';
            this.bean.IN_A1698FFILE = '';
            this.bean.IN_A1698HFILE = '';
            this.bean.IN_A1698FREGI = '';
            this.bean.IN_A1698SOURC = 'BSP';
            if (tipo_fil === '2') {
                this.bean.IN_A1698PAIS = this.getValue("txtA1698PAIS");
                this.bean.IN_A1698BANK = this.getValue("txtA1698BANK");
                this.bean.IN_A1698FPRDA = Ext.util.Format.date(this.getValue("txtA1698FPRDA"), 'Ymd');
                this.bean.IN_A1698HFILE = this.getValue("txtA1698HFILE");
                if (this.getValue("txtA1698FPRDA") === '') {
                    global.Msg({msg: 'Required Field, Processing Date'});
                    this.focus('txtA1698FPRDA');
                    return;
                } else if (this.bean.IN_A1698HFILE.length !== 4 && this.getValue("txtA1698HFILE") !== '') {
                    global.Msg({msg: 'Please, enter a valid hour'});
                    this.focus('txtA1698HFILE');
                    return;
                } else if (this.bean.IN_A1698PAIS.length !== 2 && this.getValue("txtA1698PAIS") !== '') {
                    global.Msg({msg: 'Please, enter a valid country'});
                    this.focus('txtA1698PAIS');
                    return;
                } else if (this.bean.IN_A1698BANK.length !== 3 && this.getValue("txtA1698BANK") !== '') {
                    global.Msg({msg: 'Please, enter a valid bank'});
                    this.focus('txtA1698BANK');
                    return;
                } else {
                    this.search(this.bean, e);
                }
            } else if (tipo_fil === '1') {
                this.bean.IN_A1698FREGI = Ext.util.Format.date(this.getValue("txtA1698FCARG"), 'Ymd');
                if (this.bean.IN_A1698FREGI === '') {
                    global.Msg({msg: 'Required Field, Processing Date'});
                    this.focus('txtA1698FPRDA');
                    return;
                } else {
                    this.search(this.bean, e);
                }
            }
        }
        else if (obj === 'LOAD') {
            this.loadHOT(this.beanHOT);
        }
        else if (obj === 'ERR') {
            this.beanError.IN_A1697CCUST = '139';
            this.beanError.IN_A1697PAIS = '';
            this.beanError.IN_A1697BANK = '';
            this.beanError.IN_A1697FPRDA = '';
            this.beanError.IN_A1697FFILE = '';
            this.beanError.IN_A1697HFILE = '';
            this.beanError.IN_A1697FREGI = '';
            this.beanError.IN_A1697SOURC = 'BSP';
            if (tipo_fil === '2') {
                this.beanError.IN_A1697PAIS = this.getValue("txtA1698PAIS");
                this.beanError.IN_A1697BANK = this.getValue("txtA1698BANK");
//                this.beanError.IN_A1697FPRDA = this.getValue("txtA1698FPRDA");
                this.beanError.IN_A1697FPRDA = Ext.util.Format.date(this.getValue("txtA1698FPRDA"), 'Ymd');
                this.beanError.IN_A1697HFILE = this.getValue("txtA1698HFILE");
                if (this.getValue("txtA1698FPRDA") === '') {
                    global.Msg({msg: 'Required Field, Processing Date'});
                    this.focus('txtA1698FPRDA');
                    return;
                } else if (this.beanError.IN_A1697HFILE.length !== 4 && this.getValue("txtA1698HFILE") !== '') {
                    global.Msg({msg: 'Please, enter a valid hour'});
                    this.focus('txtA1698HFILE');
                    return;
                } else if (this.beanError.IN_A1697PAIS.length !== 2 && this.getValue("txtA1698PAIS") !== '') {
                    global.Msg({msg: 'Please, enter a valid country'});
                    this.focus('txtA1698PAIS');
                    return;
                } else if (this.beanError.IN_A1697BANK.length !== 3 && this.getValue("txtA1698BANK") !== '') {
                    global.Msg({msg: 'Please, enter a valid bank'});
                    this.focus('txtA1698BANK');
                    return;
                } else {
                    this.loadError(this.beanError, e);
                }
            } else if (tipo_fil === '1') {
                this.beanError.IN_A1697FREGI = Ext.util.Format.date(this.getValue("txtA1698FCARG"), 'Ymd');
                if (this.beanError.IN_A1697FREGI === '') {
                    global.Msg({msg: 'Required Field, System Date'});
                    this.focus('txtA1698FCARG');
                    return;
                } else {
                    this.loadError(this.beanError, e);
                }
            }
        }
        else if (obj === 'ERR_FORMAT') {
            this.beanErrorFormat.IN_IDFIL = ('000000000' + this.getValue("txtIDFile"));
            this.beanErrorFormat.IN_IDFIL = this.beanErrorFormat.IN_IDFIL.substr(this.beanErrorFormat.IN_IDFIL.length - 9);
            this.searchIdFile(this.beanErrorFormat, e);
        }
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    btnClear_click: function(obj, e) {
        this.txtClear_imput();
        this.lstHOT = {};

        var f_search_by = this.getValue("cbxFiltro");
        if (f_search_by === '1')
            this.focus('txtA1698FCARG');
        else if (f_search_by === '2')
            ;
        this.focus('txtA1698FPRDA');

        var selectedIndex = this.getIndexTabSelected();
        switch (selectedIndex) {
            case 0:
                Ext.getCmp(prototype.id + '-gridControlLoadRep').getStore().removeAll();
                break;
            case 2:
                Ext.getCmp(prototype.id + '-gridControlLoadError').getStore().removeAll();
                break;
            case 3:
                Ext.getCmp(prototype.id + '-gridErrorsFormat').getStore().removeAll();
                break;
        }

    },
    btnBack_click: function() {
        global.showMenu();
    },
    // </editor-fold>

    txtClear_imput: function() {
        this.setValue('txtA1698FCARG', new Date());
        this.setValue('txtA1698FPRDA', new Date());
        this.setValue('txtA1698BANK', '');
        this.setValue('txtA1698HFILE', '');
        this.setValue('txtA1698PAIS', '');
    },
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean, opt) {

        if (opt === 'XLS') {
            this.exportExcel('/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
            return;
        }

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.LoadControlBSP.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin3">
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage3').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount3').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total3').setText(total);
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
        Ext.getCmp(prototype.id + '-gridControlLoadRep').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
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

    //<editor-fold defaultstate="collapsed" desc="loadHOT">
    loadHOT: function(beanHOT) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
            proxy: {
                url: prototype.url + '/loadHOT'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanHOT;
                    Ext.getCmp(prototype.id + '-LoadControl1').mask('Loading...', '');
                },
                load: function(obj) {
                    win.lblUser_toolTip("Estructura: A1348");
                    // <editor-fold defaultstate="collapsed" desc="paggin4">
                    var pag = Ext.getCmp(prototype.id + '-paggin4');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage4').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount4').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total4').setText(total);
                    // </editor-fold>
                    var strTexto = '';
                    if (obj.data.length > 0) {
                        me.lstHOT = obj.data.items;
                        for (var i = 0; i < me.lstHOT.length; i++) {
                            me.beanHOT = me.lstHOT[i].data;
                            strTexto += me.beanHOT.DELIVERY;
                            strTexto += '\n';
                        }
                        me.setValue('txaDelivery', me.getValue("txaDelivery") + strTexto);
                    } else {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    Ext.getCmp(prototype.id + '-LoadControl1').unmask('Loading...', '');
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="loadError">
    loadError: function(beanError, opt) {
        if (opt === 'XLS') {
            this.exportExcel('/getXLSX_err?beanString=' + encodeURI(JSON.stringify(beanError)));
            return;
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.LoadControlBSP.GridDataError', {
            proxy: {
                url: prototype.url + '/loadError'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanError;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin5">
                    var pag = Ext.getCmp(prototype.id + '-paggin5');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage5').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount5').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total5').setText(total);
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
        Ext.getCmp(prototype.id + '-gridControlLoadError').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="searchIdFile">
    searchIdFile: function(beanErrorFormat, opt) {
        if (opt === 'XLS') {
            this.exportExcel('/getXLSX_err_format?beanString=' + encodeURI(JSON.stringify(beanErrorFormat)));
            return;
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.LoadControlBSP.GridDataIdFile', {
            proxy: {
                url: prototype.url + '/searchIdFile'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanErrorFormat;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    // <editor-fold defaultstate="collapsed" desc="paggin2">
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total2').setText(total);
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
        Ext.getCmp(prototype.id + '-gridErrorsFormat').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>

    getIndexTabSelected: function() {
        var tabPanel = Ext.getCmp(prototype.id + '-tnvMain');
        var activeTab = tabPanel.getActiveTab();
        var activeTabIndex = tabPanel.items.indexOf(activeTab);
        return activeTabIndex;
    },
    txtFilterValue_keyDownHandler: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
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
            Ext.getCmp(prototype.id + '-paggin3').moveFirst();
        } else if (this.getIndexTabSelected() === 2) {
            Ext.getCmp(prototype.id + '-paggin5').moveFirst();
        } else if (this.getIndexTabSelected() === 3) {
            Ext.getCmp(prototype.id + '-paggin2').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (this.getIndexTabSelected() === 0) {
            Ext.getCmp(prototype.id + '-paggin3').movePrevious();
        } else if (this.getIndexTabSelected() === 2) {
            Ext.getCmp(prototype.id + '-paggin5').movePrevious();
        } else if (this.getIndexTabSelected() === 3) {
            Ext.getCmp(prototype.id + '-paggin2').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (this.getIndexTabSelected() === 0) {
            Ext.getCmp(prototype.id + '-paggin3').moveNext();
        } else if (this.getIndexTabSelected() === 1) {
            Ext.getCmp(prototype.id + '-paggin4').moveNext();
        } else if (this.getIndexTabSelected() === 2) {
            Ext.getCmp(prototype.id + '-paggin5').moveNext();
        } else if (this.getIndexTabSelected() === 3) {
            Ext.getCmp(prototype.id + '-paggin2').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (this.getIndexTabSelected() === 0) {
            Ext.getCmp(prototype.id + '-paggin3').moveLast();
        } else if (this.getIndexTabSelected() === 2) {
            Ext.getCmp(prototype.id + '-paggin5').moveLast();
        } else if (this.getIndexTabSelected() === 3) {
            Ext.getCmp(prototype.id + '-paggin2').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    onTextKeypress_btnSearchIDFile_clickHandler: function(obj, e, eOpts)
    {
        if (e.getKey() === e.ENTER) {
            this.btnSearchIDFile_clickHandler();
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
    },
    btnLoadHOT_clickHandler: function() {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Process load HOT?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    this.LOAD_HOT();
                }
            }
        });
    },
    LOAD_HOT: function() {

        var beanHOT_load = {
            VP_CCUST: '139',
            VP_SQLCODE: '',
            VP_MESSAGE: ''
        };
        Ext.Ajax.request({
            url: prototype.url + '/processLoadBSPHOT',
            method: 'POST',
            timeout: 60000000,
            params: beanHOT_load,
            beforerequest: Ext.getCmp(prototype.id + '-LoadControl1').mask('Loading...', ''),
            success: function(response, options)
            {
                var res = Ext.JSON.decode(response.responseText);
                var filter = res.filter;
                Ext.getCmp(prototype.id + '-LoadControl1').unmask('Loading...', '');
                global.Msg({
                    msg: filter.dbException.MESSAGE,
                    icon: 1,
                    fn: function() {
                        //Ext.getCmp(prototype.id + '-dataEntry').close();
                        //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            },
            failure: function(response, opts) {
                //console.log('server-side failure with status code ' + response.status);
                alert(response.status);
            }
        });
    },
    btnFormatMasterFile_clickHandler: function(grid, rowIndex, colIndex)
    {
        var rec = {}; //grid.getStore().getAt(rowIndex);
        var all = {}; //grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex)
    {
        
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;
        
        Ext.create('Ext.Praxis.view.sales.LoadControlBSPForm.FormatMasterFileForm', {
            id: prototype.id + '-FormatMasterFileForm',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();
    }
});
