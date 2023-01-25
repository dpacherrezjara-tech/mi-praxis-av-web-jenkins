Ext.define('Ext.Praxis.controller.flown.FlightConciliation.FlightConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FlightConciliationController',
    childs: '',
    stack: [],
    bean: {},
    bean2149: {},
    objANFLIGHT: {},
    objFLIGHTMANIF: {},
    objA1691: {},
    objA3729: {},
    objODS: {},
    objVCRJ: {},
    objDetail: {},
    gloTipoTkt: '',
    g_nflight: '',
    status: '',
    gloTipo: '',
    _path: '',
    _pathDetail: '',
    _pathDetTkt: '',
    _pathDetFlight: '',
    _pathDetFlightMain: '',
    me: '',
    NPROG: 'PX00000095',
    init: function (view) {
        this.childs = Ext.getCmp(prototype.id + '-boxPrincipal').items.items;
    },
    afterRender: function () {
        this.setStoreData();
        this.initDate();
        this.btnSearch_click();
        this.searchControlODS();
//        global.validateProgram("a", "b", "c");
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    initDate: function () {
        this.setValue('cmbDateFromYear', new Date().getFullYear());
        this.setValue('cmbDateToYear', new Date().getFullYear());

        var month = new Date().getMonth() + 1;
        if (month < 10) {
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('0' + month);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('0' + month);
        } else {
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue((month));
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue((month));
        }

//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
    },
    cbxDateFromYear_changeHandler: function () {
        this.setValue('cmbDateToYear', this.getValue("cmbDateFromYear"));
    },
    cbxDateFromMonth_changeHandler: function () {
        this.setValue('cmbDateToMonth', this.getValue("cmbDateFromMonth"));
    },
    cbxDateFromDay_changeHandler: function () {
        this.setValue('cmbDateToDay', this.getValue("cmbDateFromDay"));
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(true);
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
    BuscarTKT_keyDownHandler: function (obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                this.cargarTicket();
                if (this.getValue("txtTKT") !== '') {
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
        if (this.getValue("txtTKT") === '') {
            this.habilitarFiltros();
        }
    },
    cargarTicket: function () {
        if (this.getValue("txtTKT").length === 13) {
            this.bean.IN_TKT = this.getValue("txtTKT");
            this.bean.IN_SEQRO = this.getValue("txtROLL");
            this.searchTKT(this.bean, this.peek());
        } else {
            this.setValue('txtTKT', '');
            global.Msg({msg: 'Ticket number must contain 13 digits.'});
        }
    },
    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    onViewDetailClick: function (column, e, row, column, x, rowData) {

        Ext.getCmp(prototype.id + '-cmb_Diff').setValue('N');

        this.bean = x.record.data;
        var strTipo = Ext.getCmp(prototype.id + '-gridData').headerCt.getGridColumns()[column].dataIndex.replace('lng', '');
        var cant = 0;
        this.status = '';
        // <editor-fold defaultstate="collapsed" desc="switch (strTipo)">
        switch (strTipo) {
            case "QPRO":
                cant = this.bean.lngQPRO;
                break;
            case "QCLO":
                cant = this.bean.lngQCLO;
                break;
            case "QACC":
                this.status = 'Close';
                cant = this.bean.lngQACC;
                break;
            case "QSSIM":
                cant = this.bean.lngQSSIM;
                break;
            case "QODS":
                cant = this.bean.lngQODS;
                break;
            case "QtyCANCEL":
                cant = this.bean.lngQtyCANCEL;
                break;
            case "QVCR":
                cant = this.bean.lngQVCR;
                break;
            case "QPHY":
                cant = this.bean.lngQPHY;
                break;
            case "QSVOPRO":
                cant = this.bean.lngQSVOPRO;
                break;
            case "QSVOPEND":
                cant = this.bean.lngQSVOPEND;
                break;
            case "QSVVPRO":
                cant = this.bean.lngQSVVPRO;
                break;
            case "QSVVPEND":
                cant = this.bean.lngQSVVPEND;
                break;
            case "QFFLOW":
                cant = this.bean.lngQFFLOW;
                break;
        }
        // </editor-fold>
        if (cant > 0) {
            this.gloTipo = strTipo;
            if (this.getValue('chkObs')) {
                this.bean.IN_OBS = 'Y'
            } else {
                this.bean.IN_OBS = ''
            }
            this.searchDetail(this.bean, strTipo, 'N');
        } else {
            global.Msg({msg: 'Data Not Found'});
        }
    },
    onViewDetailNFLIGHTClick: function (column, e, row, column, x) {
        this.objANFLIGHT = x.record.data;
        this.searchDetailNFLIGHT(this.objANFLIGHT);
    },
    onViewDetailFlightManifest: function (column, e, row, column, x, y, z) {

//        Ext.getCmp(prototype.id + '-txtInfo1').show();
//        Ext.getCmp(prototype.id + '-imgInfo1').show();
        this.bean = x.record.data;
        var cant = 0;
        cant = this.bean.QCPNFI;

        if (cant > 0) {
            var IN_FSABRE = this.getValue("cmbFSabre");
            this.objFLIGHTMANIF = x.record.data;
            this.objFLIGHTMANIF.IN_FSABRE = IN_FSABRE;
            this.searchDetailFlightManifest(this.objFLIGHTMANIF);
        } else {
            global.Msg({msg: 'Data Not Found'});
        }

//           
    },
    onViewDetTicketClick: function (column, e, row, column, x, y, z) {
        this.objA1691 = x.record.data;
        var strTipo = '';
        var dataIndex, box = '';
        if (Ext.getCmp(prototype.id + '-boxDetailData').isVisible()) {
            box = 'boxDetailData';
            dataIndex = Ext.getCmp(prototype.id + '-gridDetail').headerCt.getGridColumns()[column].dataIndex;
            switch (dataIndex) {
                case 'QCPNOCR':
                    strTipo = 'QOCR';
                    break;
                case 'QCPNMA':
                    strTipo = 'QMAN';
                    break;
                case 'QCPNTOT':
                    strTipo = 'TOT';
                    break;
            }
        } else if (Ext.getCmp(prototype.id + '-boxDetailNFLGITHData').isVisible()) {
            box = 'boxDetailNFLGITHData';
            dataIndex = Ext.getCmp(prototype.id + '-gridDetailNFLIGHT').headerCt.getGridColumns()[column].dataIndex;
            switch (dataIndex) {
                case 'QCPNTOT':
                    strTipo = 'QCPNTOT';
                    break;
            }
        }

        var bean91 = {};
        bean91.DFLIGHT = this.objA1691.DFLIGHT;
        bean91.NFLIGHT = this.objA1691.NFLIGHT;
        bean91.CDEPART = this.objA1691.CDEPART;
        bean91.CARRIVA = this.objA1691.CARRIVA;
        bean91.QCPNVC = this.objA1691.QCPNVC;
        bean91.QCPNOCR = this.objA1691.QCPNOCR;
        bean91.QCPNMA = this.objA1691.QCPNMA;
        bean91.QCPNTOT = this.objA1691.QCPNTOT;
        bean91.FCLOFO = this.objA1691.FCLOFO;
        bean91.strTitulo = this.objA1691.strTitulo;

        var cant = 0;
        var gridDetTkt = '';
        switch (strTipo) {
            case 'TOT':
                Ext.getCmp(prototype.id + '-gridDetTkt1').hide();
                Ext.getCmp(prototype.id + '-gridDetTkt2').show();
                gridDetTkt = '2';
                cant = bean91.QCPNTOT;
                break;
            case 'QVCR':
                Ext.getCmp(prototype.id + '-gridDetTkt1').hide();
                Ext.getCmp(prototype.id + '-gridDetTkt2').show();
                gridDetTkt = '2';
                cant = bean91.QCPNVC;
                break;
            case 'QOCR':
                Ext.getCmp(prototype.id + '-gridDetTkt1').show();
                Ext.getCmp(prototype.id + '-gridDetTkt2').hide();
                gridDetTkt = '1';
                cant = bean91.QCPNOCR;
                break;
            case 'QMAN':
                Ext.getCmp(prototype.id + '-gridDetTkt1').hide();
                Ext.getCmp(prototype.id + '-gridDetTkt2').show();
                gridDetTkt = '2';
                cant = bean91.QCPNMA;
                break;
            case 'QCPNTOT':
                Ext.getCmp(prototype.id + '-gridDetTkt1').hide();
                Ext.getCmp(prototype.id + '-gridDetTkt2').show();
                gridDetTkt = '2';
                cant = bean91.QCPNTOT;
                strTipo = 'QVCR';
                break;
        }

        if (cant > 0) {
            this.gloTipoTkt = strTipo;
            this.searchDetTicket(bean91, strTipo, gridDetTkt, box);
        } else {
            global.Msg({msg: 'Data Not Found'});
        }
    },
    viewDataEntry_clickHandler: function (grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        this.searchBean(data, rowIndex, true, prototype.id + '-boxDetailData');
    },
    viewDataEntryTkt_clickHandler: function (column, e, row, column, x) {
        var data = x.record.data;

//        if(data.CCIA === '139'){
//            me.viewMasterTkt(data);
//        }else{
        me.viewDataEntryTkt(data, row);
//        }
    },
    viewDataEntryTkt: function (obj, row) {
        var data = obj;
        var store, boxActual;
        if (Ext.getCmp(prototype.id + '-BoxSecundario').isVisible()) {
            store = Ext.getCmp(prototype.id + '-gridTkt').getStore();
            boxActual = prototype.id + '-BoxSecundario';
        } else if (Ext.getCmp(prototype.id + '-boxDetTicket').isVisible()) {
            boxActual = prototype.id + '-boxDetTicket';
            if (Ext.getCmp(prototype.id + '-gridDetTkt1').isVisible()) {
                store = Ext.getCmp(prototype.id + '-gridDetTkt1').getStore();
            } else if (Ext.getCmp(prototype.id + '-gridDetTkt2').isVisible()) {
                store = Ext.getCmp(prototype.id + '-gridDetTkt2').getStore();
            }
        }
        this.searchBeanTkt(data.strTicket.replace(' ', '').replace(' ', ''), data.SEQ, data.SEQRO, row, store, boxActual, true);
    },
    viewDataEntry_A3729: function (grid, rowIndex, colIndex) {

        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);

    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryA3729', {
            id: prototype.id + '-DataEntryA3729',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {

        Ext.getCmp(prototype.id + '-cmb_Diff').setValue('N');
        Ext.getCmp(prototype.id + '-filter_3').hide();
        Ext.getCmp(prototype.id + '-pie').hide();
        var chkManifest = this.getValue("chkManifest");

        if (this.getValue("txtTKT") !== '') {
            this.cargarTicket();
        } else {
            this.bean.yearFrom = this.getValue("cmbDateFromYear");
            this.bean.monthFrom = this.getValue("cmbDateFromMonth");
            this.bean.yearTo = this.getValue("cmbDateToYear");
            this.bean.monthTo = this.getValue("cmbDateToMonth");
            this.bean.dayFrom = this.getValue("cmbDateFromDay");
            this.bean.dayTo = this.getValue("cmbDateToDay");
            //Fuente ======================================================
            this.bean.FFLOW = this.getValue("cmbFlagFlown");
            //Carrier =====================================================
            this.bean.CARRI = this.getValue("cmbCarrier");
            this.bean.NFLIGHT = this.getValue("txtFlight");

            if (chkManifest) {
                Ext.getCmp(prototype.id + '-boxPrincipal').hide();
                Ext.getCmp(prototype.id + '-boxFlightManifest').show();
                Ext.getCmp(prototype.id + '-BoxSecundario').hide();
                this.bean.IN_FSABRE = this.getValue("cmbFSabre");
                this.searchFlightManifest(this.bean);
            } else {
                Ext.getCmp(prototype.id + '-labelFSabre').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbFSabre').setVisible(false);
                Ext.getCmp(prototype.id + '-boxPrincipal').show();
                Ext.getCmp(prototype.id + '-boxFlightManifest').hide();
                Ext.getCmp(prototype.id + '-BoxSecundario').hide();
                this.search(this.bean);
            }

        }
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
    },
    btnExcel_click: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxPrincipal').isVisible()) {
            if (this.peek() === prototype.id + '-boxMainData') {
                var gridData = Ext.getCmp(prototype.id + '-gridData');
                var dataIndex = '', sortState = '';
                for (var i = 0; i < gridData.columns.length; i++) {
                    var columns = gridData.columns[i];
                    if (columns.sortable) {
                        if (columns.sortState !== null) {
                            dataIndex = columns.dataIndex;
                            sortState = columns.sortState;
                            break;
                        }
                    }
                }
                this.exportExcel(_path + "&dataIndex=" + dataIndex + "&sortState=" + sortState);
                //<editor-fold defaultstate="collapsed" desc="Ext.Ajax.request">
//                Ext.Msg.show({
//                    title: '.:PRAXIS:.',
//                    msg: 'Download Excel ?',
//                    buttons: Ext.MessageBox.OKCANCEL,
//                    scope: this,
//                    icon: Ext.MessageBox.QUESTION,
//                    modal: true,
//                    fn: function(btn) {
//                        if (btn === 'ok') {
//                            var data = new Array();
//                            var items = Ext.getCmp(prototype.id+'-gridData').getStore().data.items;
//                            for (var i = 0; i < items.length; i++) {
//                                data.push(items[i].data);
//                            }
//                            Ext.Ajax.request({
//                                url: prototype.url+'/searchExport',
//                                method: 'POST',
//                                timeout: 60000000,
//                                params: {listaData: JSON.stringify(data)},
//                                success: function(response, opts, a, b, c) {
//                                    var disposition = response.getResponseHeader('Content-disposition');
//                                    var contentType = response.getResponseHeader('Content-Type');
//                                    var matches = /"([^"]*)"/.exec(disposition);
//                                    var filename = (matches != null && matches[1] ? matches[1] : 'flight.xlsx');
//                                    var sliceSize = 512;
//                                    var byteCharacters = window.atob(response.responseText);
//                                    var byteArrays = [];
//                                    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//                                        var slice = byteCharacters.slice(offset, offset+sliceSize);
//
//                                        var byteNumbers = new Array(slice.length);
//                                        for (var i = 0; i < slice.length; i++) {
//                                            byteNumbers[i] = slice.charCodeAt(i);
//                                        }
//
//                                        var byteArray = new Uint8Array(byteNumbers);
//
//                                        byteArrays.push(byteArray);
//                                    }
//                                    //Tras el procesado anterior creamos un objeto blob
//                                    var blob = new Blob(byteArrays, {
//                                        type: contentType
//                                    });
//
//                                    // IE 10+
//                                    if (navigator.msSaveBlob) {
//                                        navigator.msSaveBlob(blob, filename);
//                                    } else {
//                                        //Descargamos el fichero obtenido en la petición ajax
//                                        var url = URL.createObjectURL(blob);
//                                        var link = document.createElement('a');
//                                        link.href = url;
//                                        link.download = filename;
//                                        document.body.appendChild(link);
//                                        link.click();
//                                        document.body.removeChild(link);
//                                    }
//
//                                },
//                                failure: function(response, opts) {
//                                    console.log('server-side failure with status code '+response.status);
//                                }
//                            });
//                        }
//                    }
//                });
                //</editor-fold>
            } else if (this.peek() === prototype.id + '-boxDetailData') {
                this.exportExcel(_pathDetail);
            } else if (this.peek() === prototype.id + '-boxDetailLeg') {

            } else if (this.peek() === prototype.id + '-boxDetTicket') {
                this.exportExcel(_pathDetTkt);
            } else if (this.peek() === prototype.id + '-boxDetailFlightManifest') {
                this.exportExcel(_pathDetFlight);
            }
        } else if (Ext.getCmp(prototype.id + '-BoxSecundario').isVisible()) {

        } else if (Ext.getCmp(prototype.id + '-boxFlightManifest').isVisible()) {
            console.log("")
            this.exportExcel(_pathDetFlightMain);
        }
    },
    btnClear_click: function (obj, e) {
        this.initDate();

        Ext.getCmp(prototype.id + '-cmbFlagFlown').setValue("");
        Ext.getCmp(prototype.id + '-cmbCarrier').setValue("");
        Ext.getCmp(prototype.id + '-txtFlight').setValue("");
        Ext.getCmp(prototype.id + '-txtTKT').setValue("");
        Ext.getCmp(prototype.id + '-txtROLL').setValue("");

        this.habilitarFiltros();
    },
    btnAdd_click: function () {
        if (this.peek() === prototype.id + '-boxDetTicket') {
            Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryTicket', {
                id: 'DataEntryTicketFlightConciliationForm',
                params: {
                    actionCode: 'I'
                }
            }).show();
        } else if (this.peek() === prototype.id + '-boxDetailData') {
            Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntry', {
                id: 'DataEntryFlightConciliationForm',
                params: {
                    actionCode: 'I'
                }
            }).show();
        }
    },
    btnQuery_click: function () {
        var beanQuery = {};
        if (Ext.getCmp(prototype.id + '-boxPrincipal').isVisible()) {
            if (this.peek() === prototype.id + '-boxMainData') {
                beanQuery.yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
                beanQuery.monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
                beanQuery.dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
                beanQuery.dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
                this.post_to_url(CONTEXTPATH + '/Home?'
                        + 'data=' + JSON.stringify(beanQuery) + '&'
                        //                   +'backBox=BoxSecundario&'
                        + 'strBackPro=FlightCon&'
                        + '#program-query-flight-form', {}, 'post', 'QueryFlightForm');
            } else if (Ext.getCmp(prototype.id + '-boxDetailData').isVisible()) {
                //                window.alert("boxDetailData actived");
            } else if (Ext.getCmp(prototype.id + '-boxDetTicket').isVisible()) {
                var data;
                if (Ext.getCmp(prototype.id + '-gridDetTkt1').isVisible()) {
                    data = Ext.getCmp(prototype.id + '-gridDetTkt1').getStore().data;
                } else
                if (Ext.getCmp(prototype.id + '-gridDetTkt2').isVisible()) {
                    data = Ext.getCmp(prototype.id + '-gridDetTkt2').getStore().data;
                }
                if (data.length !== 0) {
                    var beanQuery92 = data.items[0].data;
                    beanQuery92.yearFrom = beanQuery92.DFLIGHT.substring(0, 4);
                    beanQuery92.monthFrom = beanQuery92.DFLIGHT.substring(4, 6);
                    beanQuery92.dayFrom = beanQuery92.DFLIGHT.substring(6, 8);
                    beanQuery92.dayTo = beanQuery92.DFLIGHT.substring(6, 8);
                    Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryQueryTicket', {
                        id: 'DataEntryQueryTicketFlightConciliationForm',
                        params: {
                            bean: beanQuery92
                        }
                    }).show();
                }
            } else {
                global.Msg({
                    msg: 'Query Option not valid for this Report.'
                });
            }
        } else {
            global.Msg({
                msg: 'Query Option not valid for this Report.'
            });
        }
    },
    btnBack_click: function () {

        Ext.getCmp(prototype.id + '-filter_3').hide();
        Ext.getCmp(prototype.id + '-labelFSabre').setVisible(false);
        Ext.getCmp(prototype.id + '-cmbFSabre').setVisible(false);
        Ext.getCmp(prototype.id + '-labelScanTicket').setVisible(false);
        Ext.getCmp(prototype.id + '-btnScanTicket').setVisible(false);
        if (Ext.getCmp(prototype.id + '-boxPrincipal').isVisible()) {
            if (this.peek() === prototype.id + '-boxMainData') {
                global.showMenu();
            } else {
                this.stack.pop();
                global.selectedChild(this.childs, this.peek());
                if (this.peek() === prototype.id + '-boxMainData') {
                    this.selectedChild('boxMainData', '', false);
                } else if (this.peek() === prototype.id + '-boxDetailData') {
                    Ext.getCmp(prototype.id + '-filter_3').show();
                    this.selectedChild('boxDetailData', 'paggin', false);
                } else if (this.peek() === prototype.id + '-boxDetailNFLGITHData') {
                    this.selectedChild('boxDetailNFLGITHData', 'paggin2', false);
                }
            }
        } else if (Ext.getCmp(prototype.id + '-BoxSecundario').isVisible()) {
            Ext.getCmp(prototype.id + '-BoxSecundario').hide();
            Ext.getCmp(prototype.id + '-boxPrincipal').show();
            this.setValue('txtTKT', '');
        }
    },
    imFavo_clickHandler: function (cmp) {
        var url = "resources/img/botones/";
        console.log(optionSelect);
        this.bean2149.A2149IDMEN = optionSelect.nprog;
        this.bean2149.A2149MNUNM = optionSelect.title;
        this.bean2149.A2149ICON = 'assets/icons/32x32/1462928465_takeoff.png';
        this.bean2149.A2149ICON2 = 'assets/icons/128x128/1462928568_takeoff.png';
        if (cmp.icon === url + "addFav2.png") {
            cmp.setIcon(url + "delFav.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Delete Favorite");

            this.insertFavoriteMenu();
        } else if (cmp.icon === url + "delFav.png") {
            cmp.setIcon(url + "addFav2.png");
            Ext.getCmp(prototype.id + '-imgType').setTooltip("Add Favorite");
            this.deleteFavoriteMenu();
        }

    },
    // </editor-fold>
    insertFavoriteMenu: function () {
        var beanString = JSON.stringify(this.bean2149);
        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/insertFavoriteMenu',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                menuLoaded = false;
                meMain.loadMenu();
                global.Msg({msg: 'Menu is added to favorite'});
                Ext.getCmp(prototype.id + '-boxPrincipal').unmask();
                if (res.success) {
                    global.Msg({msg: 'Menu is added to favorite'});
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    deleteFavoriteMenu: function () {
        var beanString = JSON.stringify(this.bean2149);
        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/deleteFavoriteMenu',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                menuLoaded = false;
                meMain.loadMenu();
                global.Msg({msg: 'Menu is added to favorite'});
                Ext.getCmp(prototype.id + '-boxPrincipal').unmask();
                if (res.success) {
                    global.Msg({msg: 'Menu is Remove to favorite'});
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    validateAccess: function (info, opcion) {
        var bolRtn = false;
        switch (opcion)
        {
            case "A":
                if (info.PERMA === "Y")
                    bolRtn = true;
                break;
            case "L":
                if (info.PERML === "Y" || info.PERMC === "Y" || info.PERMM === "Y" || info.PERME === "Y")
                    bolRtn = true;
                break;
            case "C":
                if (info.PERMC === "Y")
                    bolRtn = true;
                break;
            case "M":
                if (info.PERMM === "Y")
                    bolRtn = true;
                break;
            case "E":
                if (info.PERME === "Y")
                    bolRtn = true;
                break;
            case "X":
                if (info.PERMX === "Y")
                    bolRtn = true;
                break;
        }

        return bolRtn;
    },
    //<editor-fold defaultstate="collapsed" desc="validateProgram">
    validateProgram: function (cmp, nprog, opcion) {
//        console.log('------- validateProgram ---------');
//        console.log('------- nprog ' + nprog);
//        console.log('------- opcion  ' +opcion);
        Ext.Ajax.request({
            url: prototype.urlMaster + '/validateUserProgramAccess',
            method: 'POST',
            timeout: 60000000,
            params: {nprog: nprog || ''},
            success: function (response, opts) {
//                console.log(response);
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var matrix = res.matrix;
                    var visible = me.validateAccess(matrix, opcion);
                    if (visible)
                        cmp.show();
                    else
                        cmp.hide();
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function (bean) {
        Ext.getCmp(prototype.id + '-BoxSecundario').hide();
        Ext.getCmp(prototype.id + '-boxPrincipal').show();
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, response, obj5) {
                    win.lblUser_toolTip("Estructura: A1691");
                    if (!me.peek().includes('boxMainData'))
                        me.selectedChild('boxMainData', '');
                    else
                        me.selectedChild('boxMainData', '', false);

                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            console.log(obj.data);
                            var Objtemp = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-txtFlight').setValue(Objtemp.NFLIGHT);
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                    //                    me.p = Ext.urlDecode(window.location.search.substring(1));
                    ////                    console.log(me.p);
//                    if (me.p.backBox === 'boxPrincipal') {
                    ////                        window.alert("OK");
                    //                    } else if (me.p.backBox === 'BoxSecundario') {
                    //                        Ext.getCmp(prototype.id+'-txtTKT').setValue(me.p.ticket);
//                        me.cargarTicket();
                    //                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        _path = prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean));
    }, //</editor-fold>
    onChangeChkObs: function () {
        if (me.stack[me.stack.length - 1 ] === 'FlightConciliationForm-boxDetailData') {
            if (this.getValue('chkObs')) {
                this.bean.IN_OBS = 'Y'
            } else {
                this.bean.IN_OBS = ''
            }
            var cmb_Diff = Ext.getCmp(prototype.id + '-cmb_Diff').getValue();
            this.searchDetail(this.bean, this.gloTipo, cmb_Diff);
        }
    },
    onDIFF: function () {

        if (me.stack[me.stack.length - 1 ] === 'FlightConciliationForm-boxDetailData') {
            if (this.getValue('chkObs')) {
                this.bean.IN_OBS = 'Y'
            } else {
                this.bean.IN_OBS = ''
            }
            var cmb_Diff = Ext.getCmp(prototype.id + '-cmb_Diff').getValue();
            this.searchDetail(this.bean, this.gloTipo, cmb_Diff);
        }
    },
    //<editor-fold defaultstate="collapsed" desc="searchDetail">
    searchDetail: function (bean, strTipo, cmb_Diff) {

        Ext.getCmp(prototype.id + '-filter_3').show();

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxMainData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean), strTipo: strTipo, cmb_Diff: cmb_Diff};
                },
                load: function (obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-boxMainData').unmask();
                    win.lblUser_toolTip("Estructura: A1691");
                    var res = Ext.JSON.decode(response._response.responseText);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            if (!me.peek().includes('boxDetailData'))
                                me.selectedChild('boxDetailData', 'paggin');
                            else
                                me.selectedChild('boxDetailData', 'paggin', false);
                            var obj = obj.data.items[0].data;
                            if (this.gloTipo === 'QPHY') {
                                Ext.getCmp(prototype.id + '-adgcPhysical').show();
                            } else {
                                Ext.getCmp(prototype.id + '-adgcPhysical').hide();
                            }
                            Ext.getCmp(prototype.id + '-gridDetail').setTitle('<center style="font-size:12px;">Operation Date : ' +
                                    bean.strFormatDate.substring(0, 4) + ' ' +
                                    bean.strFormatDate.substring(5, 8) + ' - ' +
                                    obj.strDescripcion + '</center>');
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else {
                        global.Msg({msg: res.sesion});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        //        _pathDetail = prototype.url+'/getXLSXDetail?beanString='+JSON.stringify(bean)+'&strTipo='+strTipo;
        _pathDetail = prototype.url + '/getXLSXDetail?' +
                'strTipo=' + strTipo + '&' +
                'cmb_Diff=' + cmb_Diff + '&' +
                'yearFrom=' + bean.yearFrom + '&' +
                'monthFrom=' + bean.monthFrom + '&' +
                'dayFrom=' + bean.dayFrom + '&' +
                'yearTo=' + bean.yearTo + '&' +
                'monthTo=' + bean.monthTo + '&' +
                'dayTo=' + bean.dayTo + '&' +
                'CARRI=' + bean.CARRI + '&' +
                'FFLOW=' + bean.FFLOW + '&' +
                'DFLIGHT=' + bean.DFLIGHT + '&' +
                'NFLIGHT=' + bean.NFLIGHT + '&' +
                'IN_OBS=' + bean.IN_OBS;
        ;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchTKT">
    searchTKT: function (bean, boxActual) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(boxActual).unmask();
                    win.lblUser_toolTip("Estructura: A1692");

                    Ext.getCmp(prototype.id + '-BoxSecundario').show();
                    Ext.getCmp(prototype.id + '-boxPrincipal').hide();

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridTkt').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetailFlightManifest">
    searchDetailFlightManifest: function (objFLIGHTMANIF) {
        Ext.getCmp(prototype.id + '-labelFSabre').setVisible(true);
        Ext.getCmp(prototype.id + '-cmbFSabre').setVisible(true);
        Ext.getCmp(prototype.id + '-labelScanTicket').setVisible(true);
        Ext.getCmp(prototype.id + '-btnScanTicket').setVisible(true);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailFlightManifest'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxDetailData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(objFLIGHTMANIF)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxDetailData').unmask();
                    win.lblUser_toolTip("Estructura: A3729");

                    if (obj.data.length > 0) {
                        console.log(obj.data);
                        var beanTemp = obj.data.items[0].data;
                        console.log(beanTemp);
                        if (!me.peek().includes('boxDetailFlightManifest'))
                            me.selectedChild('boxDetailFlightManifest');
//
//                        Ext.getCmp(prototype.id + '-setTitulo').setTitle('<center style="font-size:12px;">Flight Date : ' +
//                                beanTemp.strFormatDate + ' - Flight Number : ' + beanTemp.NFLIGHT +
//                         '</center>'
//                                );
                        Ext.getCmp(prototype.id + '-FlightDate').setText(beanTemp.strFormatDate);
                        Ext.getCmp(prototype.id + '-FlightNumber').setText(beanTemp.NFLIGHT);
                        Ext.getCmp(prototype.id + '-txtQty').setText(obj.data.length);
//                          this.g_nflight = beanTemp.NFLIGHT;
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailFlightManifest').bindStore(storeGridDatas);
        _pathDetFlight = prototype.url + '/getXLSX_Flight_Manifest?beanString=' + encodeURI(JSON.stringify(objFLIGHTMANIF));
//        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    //</editor-fold>
    searchFlightManifest: function (objFLIGHTMANIF) {
        Ext.getCmp(prototype.id + '-labelFSabre').setVisible(true);
        Ext.getCmp(prototype.id + '-cmbFSabre').setVisible(true);
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.url + '/searchFlightManifest'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxFlightManifest').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(objFLIGHTMANIF)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxFlightManifest').unmask();
                    win.lblUser_toolTip("Estructura: A3729");

                    if (obj.data.length > 0) {
                        var beanTemp = obj.data.items[0].data;
                        console.log(beanTemp);
//
//                        Ext.getCmp(prototype.id + '-setTitulo').setTitle('<center style="font-size:12px;">Flight Date : ' +
//                                beanTemp.strFormatDate + ' - Flight Number : ' + beanTemp.NFLIGHT +
//                         '</center>'
//                                );
//                        Ext.getCmp(prototype.id + '-FlightDate').setText(beanTemp.strFormatDate);
//                        Ext.getCmp(prototype.id + '-FlightNumber').setText(beanTemp.NFLIGHT);
//                        Ext.getCmp(prototype.id + '-txtQty').setText(obj.data.length);
//                          this.g_nflight = beanTemp.NFLIGHT;
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridFlightManifest').bindStore(storeGridDatas);
        _pathDetFlightMain = prototype.url + '/getXLSX_Flight_Manifest_Main?beanString=' + encodeURI(JSON.stringify(objFLIGHTMANIF));
//        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    cmbFSabre_changeHandler: function () {
        var chkManifest = this.getValue("chkManifest");

        objA3729 = {};
        var IN_FSABRE = this.getValue("cmbFSabre");
        this.objFLIGHTMANIF.IN_FSABRE = IN_FSABRE;

        this.objA3729 = this.objFLIGHTMANIF;

        if (chkManifest) {
            this.objFLIGHTMANIF.yearFrom = this.getValue("cmbDateFromYear");
            this.objFLIGHTMANIF.monthFrom = this.getValue("cmbDateFromMonth");
            this.objFLIGHTMANIF.yearTo = this.getValue("cmbDateToYear");
            this.objFLIGHTMANIF.monthTo = this.getValue("cmbDateToMonth");
            this.objFLIGHTMANIF.dayFrom = this.getValue("cmbDateFromDay");
            this.objFLIGHTMANIF.dayTo = this.getValue("cmbDateToDay");

            this.searchFlightManifest(this.objFLIGHTMANIF);
        } else {
            this.searchDetailFlightManifest(this.objFLIGHTMANIF);
        }

    },
    btnScanTicket_clickHandler: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to Scan Tickets ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    me.executeScanTicket(this.objFLIGHTMANIF);
                    //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                }
            }
        });

        //this.searchDetailFlightManifest(this.objFLIGHTMANIF);
    },
    //<editor-fold defaultstate="collapsed" desc="executeScanTicket">
    executeScanTicket: function (bean) {
        Ext.Ajax.request({
            url: prototype.url + '/executeScanTicket',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            beforerequest: Ext.getCmp(prototype.id + '-boxPrincipal').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxPrincipal').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.msjOption;
                    //global.Msg({msg: msj});   
                    me.searchDetailFlightManifest(bean);
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp(prototype.id + '-boxPrincipal').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    openExport: function (grid, rowIndex, colIndex, a, b, c) {
        var grid = Ext.getCmp(prototype.id + '-gridDetailFlightManifest')
        var RutaF = grid.getStore().getAt(0).data.LNKMVLO;
        var fecha = grid.getStore().getAt(0).data.DFLIGHT;
        var nFlight = grid.getStore().getAt(0).data.NFLIGHT;

        Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryExport', {
            id: 'DataEntryExportFlightConciliationForm',
            params: {
                strRuta: RutaF,
                fecha: fecha,
                nFlight: nFlight
            }
        }).show();
        this.exportFile1(RutaF, fecha, nFlight);
    },
    //<editor-fold defaultstate="collapsed" desc="exportFile1">
    exportFile1: function (ruta, fecha, nFlight) {
        Ext.Ajax.request({
            url: prototype.url + '/exportFile1',
            method: 'POST',
            timeout: 60000000,
            params: {ruta: ruta, fecha: fecha, nFlight: nFlight},
            beforerequest: Ext.getCmp('DataEntryExportFlightConciliationForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryExportFlightConciliationForm').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaFile = res.listaArray;
                    if (listaFile.length > 0) {
                        Ext.getCmp(prototype.id + '-gridFileNames').bindStore(
                                Ext.create("Ext.Praxis.store.interline.GridData", {data: listaFile})
                                );
                        meEntry.strFormatDate = listaFile[0].strFormatDate;
                        meEntry.str = res.str;
                    } else {
                        global.Msg({msg: 'This File has not been created.'});
                        meEntry.btnCancel_clickHandler();
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryExportFlightConciliationForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>   

    //<editor-fold defaultstate="collapsed" desc="searchDetailNFLIGHT">
    searchDetailNFLIGHT: function (objANFLIGHT) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailNFLIGHT'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxDetailData').mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(objANFLIGHT)};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxDetailData').unmask();
                    win.lblUser_toolTip("Estructura: A1691");

                    if (obj.data.length > 0) {
                        var beanTemp = obj.data.items[0].data;
                        if (!me.peek().includes('boxDetailNFLGITHData'))
                            me.selectedChild('boxDetailNFLGITHData', 'paggin2');
                        else
                            me.selectedChild('boxDetailNFLGITHData', 'paggin2', false);

                        Ext.getCmp(prototype.id + '-gridDetailNFLIGHT').setTitle('<center style="font-size:12px;">Operation Date : ' +
                                beanTemp.strFormatDate + ' - ' + beanTemp.strDescripcion +
                                '</center>'
                                );
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailNFLIGHT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetTicket">
    searchDetTicket: function (bean91, strTipo, n, boxActual) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.GridData', {
            proxy: {url: prototype.url + '/searchDetTicket'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-' + boxActual).mask('Loading...');
                    obj.proxy.extraParams = {beanString: JSON.stringify(bean91), strTipo: strTipo};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-' + boxActual).unmask();
                    win.lblUser_toolTip("Estructura: A1692");

                    if (obj.data.length > 0) {
                        var beanTkt = obj.data.items[0].data;
                        if (!me.peek().includes('boxDetTicket'))
                            me.selectedChild('boxDetTicket', 'paggin3');
                        else
                            me.selectedChild('boxDetTicket', 'paggin3', false);

                        Ext.getCmp(prototype.id + '-gridDetTkt' + n).setTitle('<center style="font-size:12px;">Flight Date: ' +
                                beanTkt.strFormatDate + ' - Flight Nbr: ' +
                                beanTkt.NFLIGHT + beanTkt.strDescCDEPART + beanTkt.strDescCARRIVA +
                                '</center>'
                                );
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTkt' + n).bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        //        _pathDetTkt = prototype.url+'/getXLSXDetTkt'+n+'?beanString='+JSON.stringify(bean91)+'&strTipo='+strTipo;
        _pathDetTkt = prototype.url + '/getXLSXDetTkt' + n + '?' +
                'strTipo=' + strTipo + '&' +
                'CDEPART=' + bean91.CDEPART + '&' +
                'DFLIGHT=' + bean91.DFLIGHT + '&' +
                'NFLIGHT=' + bean91.NFLIGHT + '&' +
                'CDEPART=' + bean91.CDEPART + '&' +
                'CARRIVA=' + bean91.CARRIVA;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchBeanTkt">
    searchBeanTkt: function (strTicket, SEQ, SEQRO, row, store, mask, abrir) {
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanTkt', method: 'POST',
            timeout: 60000000,
            params: {strTicket: strTicket, SEQ: SEQ, SEQRO: SEQRO},
            beforerequest: Ext.getCmp(mask).mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(mask).unmask();
                win.lblUser_toolTip("Estructura: A1692");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var beanCons = res.beanConsTkt;
                    if (beanCons !== undefined) {
                        if (beanCons.strTicket === '') {
                            global.Msg({msg: 'Record not found'});
                        } else {
                            var actionCode = '';
                            if (me.status !== '' || beanCons.strDescSTVAL === '4' || beanCons.STVAL === '3' || beanCons.STCON !== '') {
                                actionCode = 'S';
                            } else {
                                actionCode = 'U';
                            }
                            var params = {
                                actionCode: actionCode,
                                bean: beanCons,
                                lista: store,
                                rowIndex: row
                            };
                            if (abrir) {
                                Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryTicket', {
                                    id: 'DataEntryTicketFlightConciliationForm',
                                    params: params
                                }).show();
                            } else {
                                meEntryTick.p = params;
                                meEntryTick.afterRender();
                            }
                        }
                    } else {
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(mask).unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchBean">
    searchBean: function (data, rowIndex, abrir, wActual) {
        Ext.Ajax.request({
            url: prototype.url + '/searchBean',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(data)},
            beforerequest: Ext.getCmp(wActual).mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(wActual).unmask();
                win.lblUser_toolTip("Estructura: A1691");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var beanCons = res.beanCons;
                    if (beanCons !== undefined) {
                        if (beanCons.DFLIGHT === '' && beanCons.NFLIGHT === '' && beanCons.CDEPART === '' && beanCons.CARRIVA === '') {
                            global.Msg({msg: 'Record not found'});
                        } else {
                            var params = {
                                actionCode: 'U',
                                bean: beanCons,
                                lista: Ext.getCmp(prototype.id + '-gridDetail').getStore(),
                                rowIndex: rowIndex
                            };
                            if (abrir) {
                                console.log(params);
                                Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntry', {
                                    id: 'DataEntryFlightConciliationForm',
                                    params: params
                                }).show();
                            } else {
                                meEntry.p = params;
                                meEntry.afterRender();
                            }
                        }
                    } else {
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp(wActual).unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="validFlight">
    validFlight: function (beanOption, strOption, rowIndex, abrir, wActual) {
        Ext.Ajax.request({
            url: prototype.url + '/validFlight',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanOption), strOption: strOption},
            beforerequest: Ext.getCmp(wActual).mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(wActual).unmask();
                win.lblUser_toolTip("Estructura: A1691");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.msjOption;
                    var beanCons = res.beanCons;
                    if (beanCons !== undefined) {
                        var params = {
                            bean: beanCons,
                            msj: msj,
                            lista: Ext.getCmp(prototype.id + '-gridDetail').getStore(),
                            actionCode: 'V',
                            rowIndex: rowIndex
                        };
                        if (abrir) {
                            Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntry', {
                                id: 'DataEntryFlightConciliationForm',
                                params: params
                            }).show();
                        } else {
                            meEntry.p = params;
                            meEntry.afterRender();
                        }
                    } else {
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp(wActual).unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="executeOption">
    executeOption: function (beanOption, strOption, wActual) {
        Ext.Ajax.request({
            url: prototype.url + '/executeOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanOption), strOption: strOption},
            beforerequest: Ext.getCmp(wActual).mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(wActual).unmask();
                win.lblUser_toolTip("Estructura: A1691");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.msjOption;
                    global.Msg({msg: msj});

                    if (res.strOption !== 'U') {
                        meEntry.view.close();
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp(wActual).unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="buscarDatosVenta">
    buscarDatosVenta: function (beanOption) {
        Ext.Ajax.request({url: prototype.url + '/buscarDatosVenta',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanOption)},
            beforerequest: Ext.getCmp('DataEntryTicketFlightConciliationForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryTicketFlightConciliationForm').unmask();
                win.lblUser_toolTip("Estructura: A1692");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.msjOption;
                    var beanCons = res.beanConsTkt;
                    if (beanCons !== undefined) {
                        meEntryTick.p.bean = beanCons;
                        meEntryTick.p.msj = msj;
                        meEntryTick.p.soloValidar = 'true';
                        meEntryTick.p.lista = Ext.getCmp(prototype.id + '-gridDetail').getStore();
                        meEntryTick.p.actionCode = 'V';
                        meEntryTick.afterRender();
                    } else {
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryTicketFlightConciliationForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="executeOptionTkt">
    executeOptionTkt: function (bean, strOption, recalculo) {
        Ext.Ajax.request({
            url: prototype.url + '/executeOptionTkt',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean), strOption: strOption, recalculo: recalculo},
            beforerequest: Ext.getCmp('DataEntryTicketFlightConciliationForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryTicketFlightConciliationForm').unmask();
                win.lblUser_toolTip("Estructura: A1692");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.msjOption;
                    var beanCons = res.beanConsTkt;
                    global.Msg({msg: msj});
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    if (res.strOption !== 'U' && msj.substring(0, 5) !== 'Error') {
                        meEntryTick.view.close();
                    } else {
                        meEntryTick.p.bean = beanCons;
                        meEntryTick.p.msj = msj;
                        meEntryTick.p.lista = Ext.getCmp(prototype.id + '-gridDetail').getStore();
                        meEntryTick.p.actionCode = 'V';
                        meEntryTick.afterRender();
                    }
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryTicketFlightConciliationForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="validTicket">
    validTicket: function (bean, soloValidar) {
        Ext.Ajax.request({
            url: prototype.url + '/validTicket',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean), soloValidar: soloValidar},
            beforerequest: Ext.getCmp('DataEntryTicketFlightConciliationForm').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp('DataEntryTicketFlightConciliationForm').unmask();
                win.lblUser_toolTip("Estructura: A1692");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msj = res.msjOption;
                    var beanCons = res.beanConsTkt;
                    var soloValida = res.soloValidar;
                    if (beanCons !== undefined) {
                        meEntryTick.p.bean = beanCons;
                        meEntryTick.p.msj = msj;
                        meEntryTick.p.soloValidar = soloValida;
                        meEntryTick.p.lista = Ext.getCmp(prototype.id + '-gridDetail').getStore();
                        meEntryTick.p.actionCode = 'V';
                        meEntryTick.afterRender();
                    } else {
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                Ext.getCmp('DataEntryTicketFlightConciliationForm').unmask();
                console.log('server-side failure with status code ' + response.status);
            }});
    },
    //</editor-fold>

    onFileLoad: function () {

        var me = this;
//        var banco = Ext.getCmp(prototype.id + '-cmbBankCode').getValue();
//        var input = Ext.getCmp(prototype.id + '-cmbInput').getValue();
        var file = Ext.getCmp(prototype.id + '-file').getValue();

        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }

        var form = Ext.getCmp(prototype.id + '-form-01').getForm();
        form.submit({
            url: prototype.url + '/updateCouponA3729',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {fileName: file},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                console.log(res);

                if (res.success) {
                    var msjResult = res.objResult.qty_update;
                    global.Msg({msg: 'Updated ' + msjResult + ' tickets.'});
                } else {
                    global.Msg({msg: "Error Excel Load"});
                }
//                Ext.getCmp(prototype.id+'-btn-upload').enable(true);
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },
    onFileLoad_INF: function () {

        var me = this;
        var file = Ext.getCmp(prototype.id + '-file_INF').getValue();
        console.log(file);

        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-file_INF').focus();", 100);
            });
            return;
        }

        var form = Ext.getCmp(prototype.id + '-form-01_INF').getForm();
        form.submit({
            url: prototype.url + '/updateCouponA3729_INF',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {fileName: file},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                console.log(res);

                if (res.success) {
                    var msjResult = res.objResult.qty_update;
                    global.Msg({msg: 'Updated ' + msjResult + ' tickets.'});
                } else {
                    global.Msg({msg: "Error Excel Load"});
                }
//                Ext.getCmp(prototype.id+'-btn-upload_INF').enable(true);
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },
    exportExcel: function (_path) {
        console.log('exportExcel');
        console.log(_path);
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    post_to_url: function (path, params, method, id) {
        path = encodeURI(path);
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("id", id);

        document.body.appendChild(form);
        form.submit();
    },
    deshabilitarFiltros: function () {
        Ext.getCmp(prototype.id + '-cmbTipoFecha').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').disable(true);
        Ext.getCmp(prototype.id + '-cmbDateToDay').disable(true);
        Ext.getCmp(prototype.id + '-cmbFlagFlown').disable(true);
        Ext.getCmp(prototype.id + '-cmbCarrier').disable(true);
        Ext.getCmp(prototype.id + '-txtFlight').setReadOnly(true);
    },
    habilitarFiltros: function () {
        Ext.getCmp(prototype.id + '-cmbTipoFecha').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToYear').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').enable(true);
        Ext.getCmp(prototype.id + '-cmbDateToDay').enable(true);
        Ext.getCmp(prototype.id + '-cmbFlagFlown').enable(true);
        Ext.getCmp(prototype.id + '-cmbCarrier').enable(true);
        Ext.getCmp(prototype.id + '-txtFlight').setReadOnly(false);
    },
    onValidarChange: function () {
        var list = this.getValue("txtTKT").replace(/\s/g, "").split("");
        var txtTKT = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txtTKT += list[i];
            }
        }
        this.setValue('txtTKT', txtTKT.substring(0, 13));
        if (this.getValue("txtTKT") === '') {
            this.habilitarFiltros();
        }
    },
    esNumero: function (valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        if (this.peek() === prototype.id + '-boxDetailData') {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        } else if (this.peek() === prototype.id + '-boxDetailNFLGITHData') {
            Ext.getCmp(prototype.id + '-paggin2').moveFirst();
        } else if (this.peek() === prototype.id + '-boxDetTicket') {
            Ext.getCmp(prototype.id + '-paggin3').moveFirst();
        } else if (this.peek() === prototype.id + '-boxDetailFlightManifest') {
            Ext.getCmp(prototype.id + '-paggin5').moveFirst();
        }
    },
    pagPrevious: function (obj, e) {
        if (this.peek() === prototype.id + '-boxDetailData') {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        } else if (this.peek() === prototype.id + '-boxDetailNFLGITHData') {
            Ext.getCmp(prototype.id + '-paggin2').movePrevious();
        } else if (this.peek() === prototype.id + '-boxDetTicket') {
            Ext.getCmp(prototype.id + '-paggin3').movePrevious();
        } else if (this.peek() === prototype.id + '-boxDetailFlightManifest') {
            Ext.getCmp(prototype.id + '-paggin5').movePrevious();
        }
    },
    pagNext: function (obj, e) {
        if (this.peek() === prototype.id + '-boxDetailData') {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        } else if (this.peek() === prototype.id + '-boxDetailNFLGITHData') {
            Ext.getCmp(prototype.id + '-paggin2').moveNext();
        } else if (this.peek() === prototype.id + '-boxDetTicket') {
            Ext.getCmp(prototype.id + '-paggin3').moveNext();
        } else if (this.peek() === prototype.id + '-boxDetailFlightManifest') {
            Ext.getCmp(prototype.id + '-paggin5').moveNext();
        }
    },
    pagLast: function (obj, e) {
        if (this.peek() === prototype.id + '-boxDetailData') {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        } else if (this.peek() === prototype.id + '-boxDetailNFLGITHData') {
            Ext.getCmp(prototype.id + '-paggin2').moveLast();
        } else if (this.peek() === prototype.id + '-boxDetTicket') {
            Ext.getCmp(prototype.id + '-paggin3').moveLast();
        } else if (this.peek() === prototype.id + '-boxDetailFlightManifest') {
            Ext.getCmp(prototype.id + '-paggin5').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function (boxId, pagginId, add) {
        global.selectedChild(this.childs, prototype.id + '-' + boxId);
        add = add === null || add === undefined ? true : add;
        if (add)
            this.stack.push(prototype.id + '-' + boxId);

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
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else
            return "";
    },
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    // </editor-fold>

    /*showTicket: function(data, row) {
     
     console.log(data);
     if (data.CCIA === '139') {
     me.viewMasterTkt(data);
     } else {
     //            me.viewDataEntryTkt(data,row);
     me.viewProrate(data);
     }
     
     },*/
    viewTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        var strTkt = rowData.data.strTicket;

        prototypeProgram.view = 'flown-flight-conciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Flight Conciliation';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    showTicket: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        console.log('RowData');
        console.log(rowData.data);
        me.viewMasterTkt(rowData.data);
    },
    viewMasterTkt: function (data) {

        prototypeProgram.view = 'flown-flight-conciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Flight Conciliation';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = data.CCIA;
        beanProMasterTicket.IN_FORMA = data.FORMA;
        beanProMasterTicket.IN_SERIE = data.SERIE;
        beanProMasterTicket.IN_SEQ = data.SEQRO;


        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    viewProrate: function (data) {
        var bean104 = {};
        bean104.FUENTE = data.strFuente;
//        if(data.CPN_Billed>1){
//            bean104.TDNR =data.CCIA + data.FORMA + data.SERIE+'                  '+data.monthTo;
//	}else{
        bean104.TDNR = data.CCIA + data.FORMA + data.SERIE;
//	}
        bean104.CPUI = data.CUPON;
        bean104.COUNTRY = data.PSVVTA;
        bean104.HRED = data.FVTA;
        bean104.DPROCE = data.DFLIGHT;

        prototypeProgram.view = 'flown-flight-conciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Flight Conciliation';
        prototypeProgram.modulo = '';

        win.displayProFacsimilSearch(me, bean104, 'FlightConciliation');
    },
    changeControl: function () {

        var v_cmbControl = this.getValue("cmbControl");

        if (v_cmbControl === 'JSON') {
            Ext.getCmp(prototype.id + '-txtNENV').setValue(me.objVCRJ.QCPNFI);
            Ext.getCmp(prototype.id + '-txtDPRDA').setValue(me.objVCRJ.strDescripcion);
        } else {
            Ext.getCmp(prototype.id + '-txtNENV').setValue(me.objODS.QCPNFI);
            Ext.getCmp(prototype.id + '-txtDPRDA').setValue(me.objODS.strDescripcion);
        }

    },
    actualizar: function () {
        this.searchControlODS();
    },
    //<editor-fold defaultstate="collapsed" desc="searchControlODS">
    searchControlODS: function () {

        Ext.Ajax.request({
            url: prototype.url + '/searchControlODS',
            method: 'POST',
            timeout: 60000000,
            params: {nprog: nprog || ''},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {

                    me.objODS = res.objODS;
                    me.objVCRJ = res.objVCRJ;

                    console.log(me.objODS.QCPNFI);
                    console.log(me.objODS.strDescripcion);

                    Ext.getCmp(prototype.id + '-txtNENV').setValue(me.objODS.QCPNFI);
                    Ext.getCmp(prototype.id + '-txtDPRDA').setValue(me.objODS.strDescripcion);
                } else {


                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

    },
    btnDuplicate_click: function () {

        Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryDelete', {
//            id: 'DataEntryDeleteFlightConciliationForm',
            id: prototype.id + '-DataEntryDeleteFlightConciliationForm',
            params: {
                strFecha: '',
                strFuente: '',
                strccust: ''
            }
        }).show();

    }


});
