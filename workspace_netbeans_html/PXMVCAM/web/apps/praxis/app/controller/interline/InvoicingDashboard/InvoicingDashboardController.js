Ext.define('Ext.Praxis.controller.interline.InvoicingDashboard.InvoicingDashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoicingDashboardController',
    me: '',
    dataObtain: {},
    childs: '',
    stack: [],
    bean: {},
    beanTKT: {},
    bean21: {},
    ParamsDet: {},
//    _path: '',
    init: function(view) {
        me = this;
        prototype.id = 'InvoicingDashboardForm';
        prototype.url = CONTEXTPATH+'/InvoicingDashboard';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
        this.obtainData();
    },
    afterRender: function () {
        this.initDate();
        this.setValue('cmbAerolinea', '');
        this.imgSearch_clickHandler();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());
        var mes = new Date().getMonth()+1;
        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue(mes);
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
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="obtainData">
    obtainData: function () {
        this.dataObtain.AIRLINE = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(this.dataObtain) },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(
                        Ext.create('Ext.data.Store', { data: res.lstAIRLINE, autoLoad: true })
                    );
                } else global.Msg({msg: res.sesion});
            }
        });
    },
    //</editor-fold>
    BuscarTKT_keyDownHandler: function( obj , e , eOpts) {
        switch (e.getKey()) {
            case 13:
                if (this.getValue("txtTKT").length == 13) {
                    this.beanTKT.IN_TKT = this.getValue("txtTKT");
                    this.searchTKT(this.beanTKT);
                } else {
                    global.Msg({ msg: 'Ticket number must contain 13 digits.' });
                    this.setValue('txtTKT', '');
                }
//                if (this.getValue("txtTKT") != '') {
//                    this.deshabilitarFiltros();
//                }
                break;
//            case 8://Backspace
//                this.habilitarFiltros();
//                break;
//            case 32: //Spacebar
//                this.habilitarFiltros();
//                break;
//            case 46: //Delete
//                this.habilitarFiltros();
//                break;
        }
//        if (this.getValue("txtTKT") == '') {
//            this.habilitarFiltros();
//        }
    },
    imgByFINVOICE_clickHandler: function (column, e, row, column, x, rowData) {
        this.ParamsDet = x.record.data;
        this.searchDetail(this.ParamsDet);
    },
    imgByTUSO_clickHandler: function (column, e, row, column, x, rowData) {
        this.ParamsDet = x.record.data;
        this.searchDetailAIR(this.ParamsDet);
    },
    viewDetByTkt_clickHandler: function (column, e, row, column, x, rowData) {
        this.ParamsDet = x.record.data;
        this.searchDetTkt(this.ParamsDet);
    },
    viewProrate: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var nroprt = data.A050KEY;
//        nroprt = nroprt.substr(0,3) + nroprt.substr(4, 10);
        
        var beanD = {};
        beanD.strTicket = nroprt;
        
        /*
        this.post_to_url(CONTEXTPATH + '/Home?'
//            + 'beanA020=' + beanD + '&'
            + 'strTicket=' + nroprt + '&'
            + 'strBack=InterInv'
            + '#program-prorrateo-form', {}, 'post', 'ProrrateoIxCForm');
        */
       
        prototypeProgram.view = 'interline-invoicing-dashboard-form';
        prototypeProgram.nprog = 'PX00000199';
        prototypeProgram.title = 'Invoicing Dashboard';
        prototypeProgram.modulo = '';
        
        win.displayScrProrrateoIxC_2(this, beanD, 'InterInv');
    },
    post_to_url: function(path, params, method, id) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("id", id);
        
        document.body.appendChild(form);
        form.submit();
    },
    btnTUA_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var beanA020 = {};
        beanA020.strTicket = data.A050KEY.replace(/ /g, '');
        beanA020.A020TUSO = data.A050TUSO;
        if (data.A050TUA !== 0) {
            this.searchTaxes(beanA020);
        } else {
            global.Msg({msg: 'Data Not Found.'});
        }
    },

    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        Ext.getCmp(prototype.id + '-pie').show();
//        if (this.getValue("txtTKT") !== '') {
//            if (this.getValue("txtTKT").length === 13) {
//                this.beanTKT.IN_TKT = this.getValue("txtTKT");
//                this.searchTKT(this.beanTKT);
//            } else {
//                global.Msg({msg: 'Ticket number must contain 13 digits.'});
//                this.setValue('txtTKT', '');
//            }
//        } else {
            this.bean.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth");
            this.bean.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth");
            //bean.IN_CURRENCY=cmbCurrency.selectedItem.data;
            this.bean.IN_AIRLINE = this.getValue("cmbAerolinea");
            this.bean.PERMONT = this.getValue("cmbPERNUM");
            
            this.search(this.bean);
//        }
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
        this.setValue('txtTKT', '');
        this.habilitarFiltros();
    },
    imgChart_clickHandler: function() {
    },
    imgBack_clickHandler: function() {
        if (this.peek().includes("boxMainData")) {
            global.showMenu();
        } else {
            this.stack.pop();
            global.selectedChild(this.childs, this.peek());
            if (this.peek().includes("boxMainData")) {
                this.selectedChild('boxMainData', '', false);
            } else if (this.peek().includes("boxDetailData")) {
                this.selectedChild('boxDetailData', 'paggin', false);
            }else if (this.peek().includes("boxDetailAIRLINE")) {
                this.selectedChild('boxDetailAIRLINE', 'paggin2', false);
            }
        }
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        this.selectedChild('boxMainData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: WRF051");
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchTKT">
    searchTKT: function (beanTKT) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url+'/searchTKT'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanTKT)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    win.lblUser_toolTip("Estructura: A050");
                    
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxTKT');
                            var bean = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridBoxTKT').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetail">
    searchDetail: function (ParamsDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id+'-gridData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(ParamsDet)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-gridData').unmask();
                    win.lblUser_toolTip("Estructura: WRF051");
                    if (obj.data.length > 0) {
                        if(!me.peek().includes('boxDetailData')) me.selectedChild('boxDetailData', 'paggin');
                        else me.selectedChild('boxDetailData', 'paggin', false);
                        
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDataDetail').setTitle('<center>Invoice Date '+ Objtemp.strFormatDate + ' Period ' + Objtemp.PERMONT+'</center>');
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetailAIR">
    searchDetailAIR: function (ParamsDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailAIR'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id+'-gridDataDetail').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(ParamsDet)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-gridDataDetail').unmask();
                    win.lblUser_toolTip("Estructura: WRF051");
                    if (obj.data.length > 0) {
                        if(!me.peek().includes('boxDetailAIRLINE')) me.selectedChild('boxDetailAIRLINE', 'paggin2');
                        else me.selectedChild('boxDetailAIRLINE', 'paggin2', false);
                        
                        var Objtemp = obj.data.items[0].data;
                        Ext.getCmp(prototype.id + '-gridDataDetailAirline').setTitle('<center>Invoice Date '+ Objtemp.strFormatDate + ' Period ' + Objtemp.PERMONT + ' Source Code ' + Objtemp.TUSO +' - ' + Objtemp.strDescripcion+'</center>');
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetailAirline').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTkt">
    searchDetTkt: function (ParamsDet) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTkt'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id+'-boxDetailAIRLINE').mask('Loading...'),
                    obj.proxy.extraParams = {beanString: JSON.stringify(ParamsDet)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id+'-boxDetailAIRLINE').unmask();
                    win.lblUser_toolTip("Estructura: A050");
                    if (obj.data.length > 0) {
                        if (!me.peek().includes('boxDetTkt')) me.selectedChild('boxDetTkt', 'paggin3');
                        else me.selectedChild('boxDetTkt', 'paggin3', false);
                        
                        var Objtemp = obj.data.items[0].data;
                        if(Objtemp.A050TUSO==='04' || Objtemp.A050TUSO==='05'){
                            win.lblUser_toolTip("Estructura: A020");
                            Ext.getCmp(prototype.id + '-gridTktA020').show();
                            Ext.getCmp(prototype.id + '-gridTkt').hide();
			}else{
                            Ext.getCmp(prototype.id + '-gridTktA020').hide();
                            Ext.getCmp(prototype.id + '-gridTkt').show();
			}
                        Ext.getCmp(prototype.id + '-tit_det_Tkt').setText('Invoice Date ' + Objtemp.strFormatDate + '. Period ' + Objtemp.A050PSTRF + '. Source Code ' + Objtemp.A050TUSO + '. Airline ' + Objtemp.A050AIRLI3);
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridTkt').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridTktA020').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchTaxes">
    searchTaxes: function (beanA020) {
        console.log(beanA020);
        Ext.Ajax.request({
            url: prototype.url + '/searchTaxes',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(beanA020) },
            beforerequest: Ext.getCmp(prototype.id+'-boxDetTkt').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id+'-boxDetTkt').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var gridTaxesAC = res.lstTaxes;
                    if (gridTaxesAC.length > 0) {
                        Ext.create('Ext.Praxis.view.interline.InvoicingDashboardForm.DataEntry', {
                            id: 'DataEntryInvoicingDashboardForm',
                            params: {
                                gridTaxesAC: gridTaxesAC
                            }
                        }).show();
                    } else global.Msg({msg: 'No Taxes Found.'});
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id+'-boxDetTkt').unmask();
            }
        });
    },
    //</editor-fold>

    habilitarFiltros: function () {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbAerolinea').enable(true);
        Ext.getCmp(prototype.id + '-cmbPERNUM').enable(true);
        Ext.getCmp(prototype.id + '-txtTKT').enable(true);
    },
    deshabilitarFiltros: function () {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbAerolinea').disable(true);
        Ext.getCmp(prototype.id + '-cmbPERNUM').disable(true);
    },
    exportExcel: function() {
//        global.getFile(_path);
        var panel = this.peek().substr(this.peek().indexOf('-')+1);
//        console.log(panel);
        switch (panel) {
            case  'boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.bean)));
                break;
            case 'boxDetailData':
                global.getFile(prototype.url + '/getXLSX_2?beanString=' + encodeURI(JSON.stringify(this.ParamsDet)));
                break;  
            case 'boxDetailAIRLINE':
                global.getFile(prototype.url + '/getXLSX_3?beanString=' + encodeURI(JSON.stringify(this.ParamsDet)));
                break;  
            case 'boxDetTkt':
                global.getFile(prototype.url + '/getXLSX_4?beanString=' + encodeURI(JSON.stringify(this.ParamsDet)));
                break;  
        }
    },
    searchRejection: function(obj, e, eOpts) {
        var cmbFindBy = Ext.getCmp(prototype.id + '-cmbFindBy').getValue();
        if (cmbFindBy === "REJ") {
            if (e.getKey() === 13) {
                    this.bean21.IN_REJNUMBER = Ext.getCmp(prototype.id + '-txtRej').getValue();
                    this.searchRejected(this.bean21);
            }
        }
    },
    searchRejected: function(bean21) {
//        me.panelActual = '-panelMainDataDetail21';
//        global.selectedChild(me.childs, prototype.id + me.panelActual);
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchRejected'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean21)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    Ext.getCmp(prototype.id + '-pie').hide();
                    win.lblUser_toolTip("Estructura: SFI021");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
//                            me.selectedChild(me.childs, prototype.id + me.panelActual);
                            if (!me.peek().includes('boxDetTkt')) me.selectedChild('boxDetTkt', 'paggin3');
                            else me.selectedChild('boxDetTkt', 'paggin3', false);
                            
                            Ext.getCmp(prototype.id + '-gridTktA020').show();
                            Ext.getCmp(prototype.id + '-gridTkt').hide();
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridTktA020').bindStore(storeGridDatas);
//      Ext.getCmp(prototype.id + '-paggin13').bindStore(storeGridDatas);
    },
    cmbFind_changeHandler: function() {
        var cmbFindBy = Ext.getCmp(prototype.id + '-cmbFindBy').getValue();
        if (cmbFindBy === "TICKET") {
            Ext.getCmp(prototype.id + '-txtRej').hide();
//            Ext.getCmp(prototype.id+'-lblTkt').show();
            Ext.getCmp(prototype.id + '-txtTKT').show();
            Ext.getCmp(prototype.id + '-lblTkt').setText("Ticket:");
            Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        } else if (cmbFindBy === "REJ") {
            Ext.getCmp(prototype.id + '-txtTKT').hide();
            Ext.getCmp(prototype.id + '-lblTkt').setText("Rej Number:");
//            Ext.getCmp(prototype.id+'-lblTkt').show();
            Ext.getCmp(prototype.id + '-txtRej').show();
            Ext.getCmp(prototype.id + '-txtRej').setValue("");
        } else {
//            Ext.getCmp(prototype.id+'-lblTkt').hide();
            Ext.getCmp(prototype.id + '-txtTKT').hide();
            Ext.getCmp(prototype.id + '-txtRej').hide();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (this.peek().includes("boxDetailData")) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        } else if (this.peek().includes("boxDetailAIRLINE")) {
            Ext.getCmp(prototype.id+'-paggin2').moveFirst();
        } else if (this.peek().includes("boxDetTkt")) {
            Ext.getCmp(prototype.id+'-paggin3').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (this.peek().includes("boxDetailData")) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        } else if (this.peek().includes("boxDetailAIRLINE")) {
            Ext.getCmp(prototype.id+'-paggin2').movePrevious();
        } else if (this.peek().includes("boxDetTkt")) {
            Ext.getCmp(prototype.id+'-paggin3').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (this.peek().includes("boxDetailData")) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        } else if (this.peek().includes("boxDetailAIRLINE")) {
            Ext.getCmp(prototype.id+'-paggin2').moveNext();
        } else if (this.peek().includes("boxDetTkt")) {
            Ext.getCmp(prototype.id+'-paggin3').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (this.peek().includes("boxDetailData")) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        } else if (this.peek().includes("boxDetailAIRLINE")) {
            Ext.getCmp(prototype.id+'-paggin2').moveLast();
        } else if (this.peek().includes("boxDetTkt")) {
            Ext.getCmp(prototype.id+'-paggin3').moveLast();
        }
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
                if (boxChild[i].isVisible()) {
                    wt = boxChild[i].getWidth();
                    if (wt > width) {
                        width = wt;
                    }
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
