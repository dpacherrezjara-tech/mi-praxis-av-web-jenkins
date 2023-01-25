Ext.define('Ext.Praxis.controller.interline.FlownOAL.FlownOALController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FlownOALController',
    childs: '',
    stack: [],
    bean: {},
    beanTKT: {},
    beanCIA: {},
    tipo: '',
    beanCIAMonth: {},
    beanFINVO: {},
    beanCUPON: {},
    NPROG: 'PX00000204',
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
//        me = this;
        this.childs = Ext.getCmp(prototype.id + '-vskMain').items.items;
    },
    afterRender: function() {
        this.setStoreData();
        this.initDate();
        this.btnSearch_click();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(new Date().getFullYear());
//        var mes = new Date().getMonth()+1;
//        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
    },
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
    },
    cbxDateFromDay_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue());
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataMonth = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataMonth);
    },
    // </editor-fold>

    BuscarTKT_keyDownHandler: function(obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                this.cargarTicket();
                if (Ext.getCmp(prototype.id + '-txtTKT').getValue().trim() !== '') {
                    this.deshabilitarFiltros();
                }
                break;
            case 8://Backspace
                this.habilitarFiltros();
                break;
            case 32: //Spacebar
                this.habilitarFiltros();
                break;
            case 46: //Delete
                this.habilitarFiltros();
                break;
        }
        if (Ext.getCmp(prototype.id + '-txtTKT').getValue().trim() === '') {
            this.habilitarFiltros();
        }
    },
    cargarTicket: function() {
        if (Ext.getCmp(prototype.id + '-txtTKT').getValue().trim().length === 13) {
            this.beanTKT.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
            this.searchTKT(this.beanTKT);
        } else {
            Ext.getCmp(prototype.id + '-txtTKT').setValue('');
            global.Msg({msg: 'Ticket number must contain 13 digits.'});
        }
    },
    ChangeCheckGroup: function(cmp, newValue) {
        if (newValue) {
            Ext.getCmp(prototype.id + '-gridData').hide();
            Ext.getCmp(prototype.id + '-gridData2').show();
        } else {
            Ext.getCmp(prototype.id + '-gridData').show();
            Ext.getCmp(prototype.id + '-gridData2').hide();
        }
        this.btnSearch_click();
    },
    //<editor-fold defaultstate="collapsed" desc="onViewClick">
    SearchByCIA_clickHandler: function(column, e, row, column, x, rowData) {
        this.beanCIA = x.record.data;
//        this.searchByCIA(this.beanCIA);
        this.beanCIA.FINVO = '';
        this.searchByFINVO(this.beanCIA);
    },
    SearchByCIAoMonth_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        if (Ext.getCmp(prototype.id + '-chkGroup').getValue()) {
            this.SearchByCIAMonth_clickHandler(data);
        } else {
            this.SearchByCIA_clickHandler(column, e, row, column, x, rowData);
        }
    },
    SearchByCIAMonth_clickHandler: function(data) {
        this.beanCIAMonth = data;
        this.searchByCIAMonth(this.beanCIAMonth);
    },
    SearchByFINVO_clickHandler: function(column, e, row, column, x, rowData) {
        this.beanFINVO = x.record.data;
        var dataIndex = Ext.getCmp(prototype.id + '-gridData').headerCt.getGridColumns()[column].dataIndex;
        var tipo = '';
        switch (dataIndex) {
            case 'CPN_Proc':
                tipo = '1';
                break;
            case 'CPN_Aud':
                tipo = '2';
                break;
            case 'CPN_Bill':
                tipo = '3';
                break;
        }
        this.beanFINVO.FINVO = tipo;
        this.searchByFINVO(this.beanFINVO);
    },
    SearchByCUPON_clickHandler: function(column, e, row, column, x, rowData) {
        this.beanCUPON = x.record.data;
        this.searchByCUPON(this.beanCUPON);
    },
    buscarFacsimilA1692: function(column, e, row, column, x, rowData) {
        var bean1692 = x.record.data;
        var bean104 = {};

        bean104.FUENTE = bean1692.FTE;
        bean104.TDNR = bean1692.CCIA + bean1692.FORMA + bean1692.SERIE;
        bean104.CPUI = bean1692.CUPON;
        bean104.HRED = bean1692.FVTA;
        bean104.COUNTRY = bean1692.PSVVTA;

        console.log(bean104);
        console.log(bean104.TDNR.substr(0, 3));
        if (bean104.TDNR.substr(0, 3) === '139') {
//            Ext.create('Ext.Praxis.view.program.ProFacsimilForm.ProFacsimilForm', {
//                id: 'ProFacsimilForm',
//                params: {
//                    data: bean104
//                }
//            }).show();
//            this.searchFacsimil(bean104, '');
        } else {
            prototypeProgram.view = 'interline-flown-oal-form';
            prototypeProgram.nprog = 'PX00000204';
            prototypeProgram.title = 'Flown OAL';
            prototypeProgram.modulo = '';

            win.displayProFacsimilSearch(this, bean104, 'FlownOAL');
//            Ext.create('Ext.Praxis.view.program.ProFacsimilForm.ProFacsimilForm', {
//                id: 'ProFacsimilForm',
//                params: {
//                    data: bean104
//                }
//            }).show();
        }
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-txtTKT').getValue().trim() !== '') {
            this.cargarTicket();
        } else {
            this.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
            this.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
            this.bean.IN_CARR = Ext.getCmp(prototype.id + '-cbxCarrier').getValue();
            this.bean.IN_STVAL = (Ext.getCmp(prototype.id + '-chkGroup').getValue()) ? 'M' : '';
            this.search(this.bean);
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnExcel_click: function(obj, e) {


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
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        this.habilitarFiltros();
    },
    btnBack_click: function(obj, e) {
        if (this.peek() === prototype.id + '-boxMainData') {
            global.showMenu();
        } else {
            this.stack.pop();
            if (this.peek() === prototype.id + '-boxMainData') {
                this.selectedChild('boxMainData', false);
            } else if (this.peek() === prototype.id + '-boxByCIAMonthData') {
                this.selectedChild('boxByCIAMonthData', false);
            } else if (this.peek() === prototype.id + '-boxByCIAData_1') {
                this.selectedChild('boxByCIAData_1', false);
            } else if (this.peek() === prototype.id + '-boxTKT') {
                this.selectedChild('boxTKT', false);
            }
        }
    },
    imFavo_clickHandler: function(cmp) {
        var url = "resources/img/botones/";
        if (cmp.icon === url + "addFav2.png") {
            cmp.setIcon(url + "delFav.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Delete Favorite");
            global.Msg({msg: 'Menu is added to favorite'});
//            this.insertFavoriteMenu(this.bean2149);	
        } else if (cmp.icon === url + "delFav.png") {
            cmp.setIcon(url + "addFav2.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Add Favorite");
            global.Msg({msg: 'Menu is Remove to favorite'});
//            this.deleteFavoriteMenu(this.bean2149);
        }
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {
        var flag = true, boxActual = '';
        if (this.peek() === '') {
            boxActual = prototype.id + '-boxConsultas';
        } else {
            if (this.peek() === prototype.id + '-boxMainData')
                flag = false;
            else
                boxActual = this.peek();
        }
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    if (flag)
                        Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    if (flag)
                        Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: A1692");

                    me.selectedChild('boxMainData');

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByCIA">
    searchByCIA: function(beanCIA) {
        console.log(beanCIA);
//        var boxActual = this.peek() === '' ? prototype.id+'-boxMainData' : boxActual;
//        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
//            proxy: {
//                url: prototype.url+'/searchByCIA'
//            },
//            listeners: {
//                beforeload: function (obj) {
//                    Ext.getCmp(boxActual).mask('Loading...');
//                    obj.proxy.extraParams = {beanString: JSON.stringify(beanCIA)};
//                },
//                load: function (obj, obj2, success, response, obj5) {
//                    Ext.getCmp(boxActual).unmask();
//                    win.lblUser_toolTip("Estructura: A1692");
//                    
//                    var res = Ext.JSON.decode(response._response.responseText);
//                    if (res.success) {
//                        if (obj.data.length > 0) {
//                            me.selectedChild('boxMainData_2');
//                            
//                            Ext.getCmp(prototype.id+'-cmbPMI').hide();
//                        } else {
//                            global.Msg({msg: 'Data not found'});
//                        }
//                    } else global.Msg({msg: res.sesion});
//                    global.clear();
//                }
//            }
//        });
//        Ext.getCmp(prototype.id+'-gridMainData_2').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id+'-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByCIAMonth">
    searchByCIAMonth: function(beanCIAMonth) {
        var cmpCarga = Ext.getCmp(this.peek());
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByCIAMonth'
            },
            listeners: {
                beforeload: function(obj) {
                    cmpCarga.mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanCIAMonth)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    cmpCarga.unmask();
                    win.lblUser_toolTip("Estructura: A1692");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxByCIAMonthData');
                            var Objtemp = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-gridDataByCIAMonth').setTitle('<center style="font-size:13px;"> Flight Month ' + Objtemp.strFormatDate2 + '</center>');
                            if (!Ext.getCmp(prototype.id + '-chkGroup').getValue()) {
//                                Ext.getCmp(prototype.id+'-gridDataByCIA').setTitle(Ext.getCmp(prototype.id+'-gridDataByCIA').getTitle()+' Carrier '+ Objtemp.strDescSTNEW);
                            }
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataByCIAMonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByFINVO">
    searchByFINVO: function(beanFINVO) {
        var cmpCarga = Ext.getCmp(this.peek());
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByFINVO'
            },
            listeners: {
                beforeload: function(obj) {
                    cmpCarga.mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanFINVO)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    cmpCarga.unmask();
                    win.lblUser_toolTip("Estructura: A1692");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxByCIAData_1');
                            me.tipo = 'b';
                            var Objtemp_1 = obj.data.items[0].data;
                            var title = ' Flight Month ' + Objtemp_1.strFormatDate2;
                            if (!Ext.getCmp(prototype.id + '-chkGroup').getValue()) {
                                title += ' Carrier ' + Objtemp_1.strDescSTNEW;
                            }
                            Ext.getCmp(prototype.id + '-gridDataByCIA_1').setTitle('<center style="font-size:13px;">' + title + '</center>');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataByCIA_1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchByCUPON">
    searchByCUPON: function(beanCUPON) {
        var cmpCarga = Ext.getCmp(this.peek());
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByCUPON'
            },
            listeners: {
                beforeload: function(obj) {
                    cmpCarga.mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanCUPON)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    cmpCarga.unmask();
                    win.lblUser_toolTip("Estructura: A1692");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxByCUPONData');
                            var Objtemp = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-gridDataByCUPON').setTitle('<center style="font-size:13px;"> Flight Date ' + Objtemp.strFormatDate + ' Carrier ' + Objtemp.CARR + ' Cia : ' + Objtemp.CCIA + ' - ' + Objtemp.strSQL + '</center>');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataByCUPON').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchTKT">
    searchTKT: function(beanTKT) {
        var cmpCarga = Ext.getCmp(this.peek());
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT'
            },
            listeners: {
                beforeload: function(obj) {
                    cmpCarga.mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(beanTKT)};
                },
                load: function(obj, obj2, success, response, obj5) {
                    cmpCarga.unmask();
                    win.lblUser_toolTip("Estructura: A1692");

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            me.selectedChild('boxTKT');
                            var Objtemp = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-gridTicket').setTitle('<center style="font-size:13px;"> Flight Date ' + Objtemp.strFormatDate + ' Carrier ' + Objtemp.CARR + ' Cia : ' + Objtemp.CCIA + ' - ' + Objtemp.strSQL + '</center>');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridTicket').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchFacsimil">
//    searchFacsimil: function (bean104, strFuente) {
//        var cmpCarga = Ext.getCmp(this.peek());
//        Ext.Ajax.request({
//            url: prototype.url+'/searchFacsimil',
//            method: 'POST',
//            timeout: 60000000,
//            params: {beanString: JSON.stringify(bean104), strFuente: strFuente},
//            beforerequest: cmpCarga.mask('Loading...'),
//            success: function (response, opts) {
//                cmpCarga.unmask();
//                var res = Ext.JSON.decode(response.responseText);
//                if (res.success) {
//                    var params = {};
//                    params.bean = res.beanFaximil;
//                    params.beanA020 = res.dataA020;
//                    params.beanA728 = res.dataA728;
//                    params.lista = res.lstSectores;
//                    console.log(params);
//                } else global.Msg({msg: res.sesion});
//            },
//            failure: function (response, opts) {
//                cmpCarga.unmask();
//                console.log('server-side failure with status code '+response.status);
//            }
//        });
//    },
    //</editor-fold>

    exportExcel: function() {

        var currentPanel = this.peek();
        var valueCheckBox = Ext.getCmp(prototype.id + '-chkGroup').getValue();
        var beanString = '';
        var strEncode = '';

        switch (currentPanel) {
            case prototype.id + '-boxMainData':
                if (!valueCheckBox) {
                    beanString = JSON.stringify(this.bean);
                    strEncode = encodeURI(prototype.url + '/getXLSX?beanString=' + beanString);
                } else {
                    beanString = JSON.stringify(this.bean);
                    strEncode = encodeURI(prototype.url + '/getXLSX_Tot_Month?beanString=' + beanString);
                }
                break;
            case prototype.id + '-boxByCIAMonthData':

                beanString = JSON.stringify(this.beanCIAMonth);
                strEncode = encodeURI(prototype.url + '/getXLSX_ByCIAMonth?beanString=' + beanString);
                break;

            case prototype.id + '-boxByCIAData_1':
                beanString = JSON.stringify(this.beanFINVO);
                strEncode = encodeURI(prototype.url + '/getXLSX_ByFINVO?beanString=' + beanString);

                break;
            case prototype.id + '-boxByCUPONData':
                beanString = JSON.stringify(this.beanCUPON);
                strEncode = encodeURI(prototype.url + '/getXLSX_ByCUPON?beanString=' + beanString);
                break;
            case prototype.id + '-boxTKT':
                beanString = JSON.stringify(this.beanTKT);
                strEncode = encodeURI(prototype.url + '/getXLSX_TKT?beanString=' + beanString);
                break;

        }

        global.getFile(strEncode);

    },
    habilitarFiltros: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToDay').enable(true);
        Ext.getCmp(prototype.id + '-cbxCarrier').enable(true);
        Ext.getCmp(prototype.id + '-chkGroup').enable(true);
        Ext.getCmp(prototype.id + '-txtTKT').enable(true);
    },
    deshabilitarFiltros: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToDay').disable(true);
        Ext.getCmp(prototype.id + '-cbxCarrier').disable(true);
        Ext.getCmp(prototype.id + '-chkGroup').disable(true);
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        this.getPaggin().moveFirst();
    },
    pagPrevious: function(obj, e) {
        this.getPaggin().movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin().moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin().moveLast();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(box, add) {
        add = add === false ? add : true;
        if (!Ext.getCmp(prototype.id + '-' + box).isVisible()) {
            if (add)
                this.stack.push(prototype.id + '-' + box);
            global.selectedChild(this.childs, prototype.id + '-' + box);
        }
        var paggin = this.getPaggin();
        if (paggin === null) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-boxPagDetail').hide();
        } else {
            //<editor-fold defaultstate="collapsed" desc="setPaggin">
            var pagData = paggin.getPageData();

            var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
            var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
            var total = Ext.util.Format.number(pagData.total, '0,000');

            Ext.getCmp(prototype.id + '-lblPagActual').setText(currentPage);
            Ext.getCmp(prototype.id + '-lblPagTotal').setText(pageCount);
            Ext.getCmp(prototype.id + '-lblRowsTotal').setText(total);
            //</editor-fold>
            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-boxPagDetail').show();

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + box).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-boxPagDetail').setWidth(width);
        }
    },
    getPaggin: function() {
        switch (this.peek()) {
            case prototype.id + '-boxByCIAMonthData':
                return Ext.getCmp(prototype.id + '-paggin');
            case prototype.id + '-boxByCIAData_1':
                return Ext.getCmp(prototype.id + '-paggin2');
            case prototype.id + '-boxByCUPONData':
                return Ext.getCmp(prototype.id + '-paggin3');
            case prototype.id + '-boxTKT':
                return Ext.getCmp(prototype.id + '-paggin4');
            default:
                return null;
        }
    },
    peek: function() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getLeft: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    onValidarChange: function(cmp, value) {
        var list = cmp.getValue().replace(/\s/g, "").split("");
        var txt = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txt += list[i];
            }
        }
        cmp.setValue(txt.substring(0, 13));
        if (cmp.getValue() === '') {
            this.habilitarFiltros();
        }
    },
    esNumero: function(valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
