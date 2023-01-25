Ext.define('Ext.Praxis.controller.interline.SPAReport.SPAReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SPAReportController',
    me: '',
    childs: '',
    bean: {},
    _path: '',
    _pathDetail: '',
    _pathWRF014: '',
    usu: '',
    init: function(view) {
        me = this;
        prototype.id = 'SPAReportForm';
        prototype.url = CONTEXTPATH + '/SPAReport';
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        this.setStoreData();
    },
    afterRender: function() {
//        this.setValue('cmbDateFromYear', new Date().getFullYear());
//        this.setValue('cmbDateToYear', new Date().getFullYear());
        this.setValue('cmbDateFromYear', '');
        this.setValue('cmbDateToYear', '');
        this.setValue('cmbDateFromMonth', '');
        this.setValue('cmbDateToMonth', '');
        this.setValue('cmbDateFromDay', '');
        this.setValue('cmbDateToDay', '');
        this.setValue('cmbAerolinea', '');
        this.imgSearch_clickHandler();



        this.storeProrrate = new Ext.data.ArrayStore({
            autoDestroy: false,
            fields: ['data']
        });
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
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
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        //<editor-fold defaultstate="collapsed" desc="obtainDataCombo">
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstAirlines = res.lstAirlines;
                var airlines = new Array();
                airlines.push(['', 'All']);
                lstAirlines.forEach(function callback(currentValue, index, array) {
                    airlines.push([currentValue.A005KEY, currentValue.A005KEY + ' - ' + currentValue.A005KEY2]);
                });
                var store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'airlines', autoLoad: true, data: airlines, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(store);
            }
        });
        //</editor-fold>
    },
    // </editor-fold>

    viewPDFs: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
//        window.alert("viewPDFs !");

        Ext.Ajax.request({
            url: prototype.url + '/searchNamesFiles',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: JSON.stringify(data)},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {
                    var listaFile = res.data;
                    if (listaFile.length > 0) {
                        console.log(listaFile);
//                        me.storeFields.loadData(listaFile);
                        me.imgInfo_clickHandlerAttach(listaFile);
                    }
                }
            }
        });

    },
    imgInfo_clickHandlerAttach: function(listaFile) {


        if (Ext.getCmp(prototype.id + '-winInfo') === undefined) {

            var win = new Ext.Window({
                id: prototype.id + '-winInfo',
                title: "Attachments",
                height: 250,
                width: 360,
                items: [
                    {xtype: 'grid',
                        id: prototype.id + '-gridFileNames',
//                        store: me.storeFields,
                        border: true,
                        width: 350,
                        height: 250,
                        columnLines: true,
                        columns: {
                            defaults: {
                                menuDisabled: true,
                                sortable: false,
                                align: 'center'
                            },
                            items: [
                                {text: 'Names', dataIndex: 'strDescripcion', width: 350, align: 'center',
                                    listeners: {
                                        click: function(obj, obj2, num_row, num_column, cpm, row, g) {
                                            var data = row.data;

//                                            var IN_FILE = data.nomFile;
//                                            var A3096FCARG = data.A3096FCARG;
//                                            var A3096TKT = data.A3096TKT;//    


                                            var nombre = data.strDescripcion;
                                            var ruta = data.strDescripcion2.replaceAll('*', '\\');
                                            var path = ruta + '\\\\' + nombre;

                                            console.log(path);
                                            window.open(path, '_blank');

                                            Ext.Ajax.request({
                                                url: prototype.url + '/download',
                                                method: 'POST',
                                                timeout: 60000000,
                                                params: {ruta: path},
                                                success: function(response, opts, a, b, c) {

                                                    var res = Ext.JSON.decode(response.responseText);

                                                    var resultByte = res.bytes;
                                                    var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
//                                                    var blob = new Blob([bytes], {type: "image/gif"});// change resultByte to bytes
                                                    var blob = new Blob([bytes]);// change resultByte to bytes

                                                    var link = document.createElement('a');
                                                    link.href = window.URL.createObjectURL(blob);
                                                    link.download = nombre;
                                                    link.click();
                                                },
                                                failure: function(response, opts) {
                                                    console.log('server-side failure with status code ' + response.status);
                                                }
                                            });
                                        }
                                    },
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:left;";
                                        value = '<b>' + value + '</b>';
                                        return '<a href="#interline-spa-report-form" style="color:#057ECB;text-decoration:none;">' + value + '</a>';
                                    }
                                },
                            ],
                        }
                    }
                ],
                listeners: {
                    'close': function(win) {
                        win.destroy();
                    },
                    'hide': function(win) {
                        win.destroy();
                    }
                }
            });
            win.show();
        }

        this.storeFields = new Ext.data.ArrayStore({
            idProperty: 'storeFieldsCon',
            autoLoad: false,
            autoDestroy: true,
            storeId: 'storeFieldsCon',
            idIndex: 0,
            // fields: ['data']
            fields: [
                {name: 'strDescripcion', type: 'string'}
            ]
        });
        me.storeFields.loadData(listaFile);
        Ext.getCmp(prototype.id + '-gridFileNames').bindStore(me.storeFields);

    },
    viewDetail: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        _pathDetail = prototype.url + '/getXLSXDetail?' +
                'A1155CODAC=' + data.A1155CODAC + '&' +
                'A1155INDAC=' + data.A1155INDAC + '&' +
                'A1155VRSAC=' + data.A1155VRSAC;

        this.searchDetail(data);
    },
    viewSearch: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        console.log(data);
        this.search(data);
        _path = prototype.url + '/getXLSX?' +
                'IN_FECHA_FROM=' + data.IN_FECHA_FROM + '&' +
                'IN_FECHA_TO=' + data.IN_FECHA_TO + '&' +
                'IN_STATUS=' + data.IN_STATUS + '&' +
                'IN_AIRLINE=' + data.IN_AIRLINE + '&' +
                'IN_INDICATOR=' + data.IN_INDICATOR + '&' +
                'IN_VIGENTE=' + data.IN_VIGENTE + '&' +
                'IN_CIA1=' + data.IN_CIA1 + '&' +
                'IN_CIA2=' + data.IN_CIA2 + '&' +
                'IN_FFIN=' + data.IN_FFIN;
    },
    viewWRF014: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        if (data.A1155IDSCO === 'Y') {
            this.LlenarData(data);
            _pathWRF014 = prototype.url + '/getXLSXWRF014?' +
                    'A1155CIAFM=' + data.A1155CIAFM + '&' +
                    'A1155CODAC=' + data.A1155CODAC + '&' +
                    'A1155INDAC=' + data.A1155INDAC + '&' +
                    'A1155VRSAC=' + data.A1155VRSAC;

            this.searchWRF014(data);
        }
    },
//    viewA728: function(column, e, row, column, x, rowData) {
//        var data = x.record.data;
//        //PENDIENTE
////        var nroprt:String = app.trim(data.NROPRT);
////	Application.application.displayBwrProrrateoA728('SPA', nroprt);
//    },
    imgSave: function() {
        var objWRF014 = {};
        objWRF014.AIRLINE = this.getValue("txtA1155CIAFM");
        objWRF014.CODAC = this.getValue("txtA1155CODAC");
        objWRF014.INDAC = this.getValue("txtA1155INDAC");
        objWRF014.VRSAC = this.getValue("txtA1155VRSAC");

        objWRF014.SEQAC = this.getValue("txtSequence");
        objWRF014.REFE = this.getValue("txtReference");
        objWRF014.FBEGIN = this.getValue("txtFBEGIN");
        objWRF014.FENDIN = this.getValue("txtFENDIN");
        objWRF014.FSEND = this.getValue("txtFSEND");
        objWRF014.FRECE = this.getValue("txtFRECE");
        objWRF014.FENTR = this.getValue("txtFENTR");

        this.SaveAddendum(objWRF014);
    },
    LlenarData: function(data) {
        this.setValue('txtA1155AIRLI', data.A1155AIRLI);
        this.setValue('txtA1155CIAFM', data.A1155CIAFM);
        this.setValue('txtA1155CODAC', data.A1155CODAC);
        this.setValue('txtA1155INDAC', data.A1155INDAC);
        this.setValue('txtA1155VRSAC', data.A1155VRSAC);
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        this.bean.IN_FECHA_FROM = this.getValue("cmbDateFromYear") + this.getValue("cmbDateFromMonth");
        this.bean.IN_FECHA_TO = this.getValue("cmbDateToYear") + this.getValue("cmbDateToMonth");
//        this.bean.IN_STATUS = this.getValue("cmbStatus");
        this.bean.IN_STATUS = '';
        this.bean.IN_AIRLINE = this.getValue("cmbAerolinea");
        this.bean.IN_INDICATOR = this.getValue("cmbIndicator");
//        var option = Ext.getCmp(prototype.id + '-chkVigentes').getValue();
//        if (option) {
//            this.bean.IN_VIGENTE = 'Y';
//            this.bean.IN_STATUS = 'C';
//            Ext.getCmp(prototype.id + '-cmbStatus').disable(true);
//        } else {
//            this.bean.IN_VIGENTE = '';
//            Ext.getCmp(prototype.id + '-cmbStatus').enable(true);
//        }
        this.bean.IN_VIGENTE = '';
        _pathPrincipal = prototype.url + '/getXLSXPrincipal?' +
                        'IN_FECHA_FROM=' + this.bean.IN_FECHA_FROM + '&' +
                        'IN_FECHA_TO=' + this.bean.IN_FECHA_TO + '&' +
                        'IN_STATUS=' + this.bean.IN_STATUS + '&' +
                        'IN_AIRLINE=' + this.bean.IN_AIRLINE + '&' +
                        'IN_INDICATOR=' + this.bean.IN_INDICATOR + '&' +
                        'IN_VIGENTE=' + this.bean.IN_VIGENTE;

//        this.search(this.bean);
        this.searchPrincipal(this.bean);
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgChart_clickHandler: function() {
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
        if (Ext.getCmp(prototype.id + '-boxWRF014Data').isVisible()) {
            this.CleanFields();
        }
    },
    imgBack_clickHandler: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            global.showMenu();
            this.selectedChild('boxMainDataPrincipal');
        } else if (Ext.getCmp(prototype.id + '-boxDetailData').isVisible() || Ext.getCmp(prototype.id + '-boxWRF014Data').isVisible()) {
            this.selectedChild('boxMainData');
            Ext.getCmp(prototype.id + '-boxPaginacion').show();
        }
    },
    // </editor-fold>

    searchPrincipal: function(bean) {
        this.selectedChild('boxMainDataPrincipal');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.SPAReport.GridData', {
            proxy: {
                url: prototype.url + '/searchPrincipal'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1155");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    } else {
                        Ext.getCmp(prototype.id + '-boxPaginacion').show();
                        var bean = obj.data.items[0].data;
                        me.usu = bean.A1155UMODI;
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataPrincipal').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(data) {
        this.selectedChild('boxMainData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.SPAReport.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = data;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1155");
                    // <editor-fold defaultstate="collapsed" desc="paggin2">
//                    var pag = Ext.getCmp(prototype.id + '-paggin2');
//                    var pagData = pag.getPageData();
//
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    } else {
//                        Ext.getCmp(prototype.id + '-boxPaginacion').show();
                        var bean = obj.data.items[0].data;
                        me.usu = bean.A1155UMODI;
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDetail">
    searchDetail: function(data) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.SPAReport.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = data;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1402");
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    } else {
                        me.selectedChild('boxDetailData');
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchWRF014">
    searchWRF014: function(data) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.SPAReport.GridData', {
            proxy: {
                url: prototype.url + '/searchWRF014'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = data;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: WRF014");
                    me.selectedChild('boxWRF014Data');
                    if (me.usu === 'SAP07' || me.usu === 'SAP01' || me.usu === 'JPEREZ') {
                        Ext.getCmp(prototype.id + '-BoxAddendum').show();
                    }
                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found'});
                    } else {
                        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridWRF014Detail').bindStore(storeGridDatas);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="SaveAddendum">
    SaveAddendum: function(objWRF014) {
        Ext.Ajax.request({
            url: prototype.url + '/SaveAddendum',
            method: 'POST',
            timeout: 60000000,
            params: objWRF014,
            beforerequest: Ext.getCmp(prototype.id + '-boxWRF014Data').mask('Loading...'),
            success: function(response, opts) {
                Ext.getCmp(prototype.id + '-boxWRF014Data').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success)
                    global.Msg({msg: res.msj});
                else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-boxWRF014Data').unmask();
            }
        });
    },
    //</editor-fold>

    CleanFields: function() {
        this.setValue('txtReference', '');
        this.setValue('txtFBEGIN', '');
        this.setValue('txtFENDIN', '');
        this.setValue('txtFSEND', '');
        this.setValue('txtFRECE', '');
        this.setValue('txtFENTR', '');
        this.setValue('txtSequence', '');
    },
    exportExcel: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.getFile(_path);
        } else if (Ext.getCmp(prototype.id + '-boxDetailData').isVisible()) {
//            global.getFile(_pathDetail);
        } else if (Ext.getCmp(prototype.id + '-boxWRF014Data').isVisible()) {
//            global.getFile(_pathWRF014);
        }else if (Ext.getCmp(prototype.id + '-boxMainDataPrincipal').isVisible()){
            global.getFile(_pathPrincipal);
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainDataPrincipal').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
//        else if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id + '-paggin2').moveFirst();
//        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainDataPrincipal').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
//        else if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id + '-paggin2').movePrevious();
//        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainDataPrincipal').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
//        else if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id + '-paggin2').moveNext();
//        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainDataPrincipal').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
//        else if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
//            Ext.getCmp(prototype.id + '-paggin2').moveLast();
//        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    selectedChild: function(box) {
        box = prototype.id + '-' + box;
        var b;
        for (var i = 0; i < this.childs.length; i++) {
            b = this.childs[i];
            if (b.id === box)
                b.show();
            else
                b.hide();
        }
    },
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
            this.imgSearch_clickHandler();
        }
    },
    // </editor-fold>
    viewA728: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        console.log(data.NROPRT);
        Ext.getCmp(prototype.id + '-centerC').setVisible(false);
        Ext.getCmp(prototype.id + '-ScreenProrrate').setVisible(true);

        var cmbA728IPLUS = Ext.getCmp(prototype.id + '-cmbA728IPLUS');
        cmbA728IPLUS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "?"],
                ["S", "Si"],
                ["N", "No"]
            ]
        }));
        cmbA728IPLUS.setValue("");

        var busca = false;
        var beanA728 = {};

        if (data.NROPRT.trim().length === 9) {
            busca = true;
            beanA728.A728NROPRT = data.NROPRT;
        } else if (data.NROPRT.trim().length >= 14) {
            busca = true;
            beanA728.A728CIA = data.NROPRT.trim().substring(0, 3);
            beanA728.A728NRODOC = data.NROPRT.trim().substring(3, 13);
            beanA728.A728CUPON = data.NROPRT.trim().substring(13, 14);
        }

        if (beanA728 !== null && busca === true) {
            this.searchProrate(beanA728);
        }

    },
    searchProrate: function(beanA728) {
        Ext.Ajax.request({
            url: CONTEXTPATH + '/ProrrateoA728/searchProrate',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(beanA728)},
            beforerequest: Ext.getBody().mask('Loading...'),
            success: function(response, opts) {
                Ext.getBody().unmask();
                win.lblUser_toolTip("Estructura: A728/A005");
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var beanA728 = res.dataA728;
                    var lista = res.lstSectores;
                    console.log(beanA728);
                    console.log(lista);
                    if (beanA728 !== null && lista !== null) {
                        me.mostrarData(beanA728, lista);
                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                } else
                    global.Msg({msg: res.sesion});
                global.clear();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getBody().unmask();
            }
        });
    },
    mostrarData: function(beanA728, lista) {
        this.setValue('txtA020KEY', beanA728.A728NROPRT.trim());
        this.setValue('txtTicket', beanA728.A728CIA.trim() + ' ' + beanA728.A728NRODOC.trim() + ' ' + beanA728.A728CUPON.trim());
        this.setValue('txtA728AIRFAC', beanA728.A728AIRFAC.trim());
        this.setValue('txtA020SUFECH', beanA728.A728FECFAC.trim());
        this.setValue('txtA728FECVTA', beanA728.A728FECVTA.trim());
        this.setValue('txtA728FVLO1', beanA728.A728FVLO1.trim());
        this.setValue('txtA020SDATE', beanA728.A728FREGIS.trim() + ' - ' + beanA728.A728HREGIS.trim());
        this.setValue('txtA728CTYEMI', beanA728.A728CTYEMI.trim());
        this.setValue('txtA728CTYVTA', beanA728.A728CTYVTA.trim());
        this.setValue('txtA728CODIT', beanA728.A728CODIT.trim());
        this.setValue('txtA020USER', beanA728.A728REGIST.trim());
        this.setValue('txtA728ATBP', Ext.util.Format.number(beanA728.A728ATBP, '0,000.00'));
        this.setValue('txtA728MDAATB', beanA728.A728MDAATB.trim());
        if (beanA728.A728IPLUS === 'S') {
            this.setValue('cmbA728IPLUS', 'Si');
        } else if (beanA728.A728IPLUS === 'N') {
            this.setValue('cmbA728IPLUS', 'No');
        } else {
            this.setValue('cmbA728IPLUS', '');
        }
        this.setValue('txtA728CPLUSS', Ext.util.Format.number(beanA728.A728CPLUSS, '0,000.00'));
        this.setValue('txtA728TDESC', beanA728.A728TDESC.trim());
        this.setValue('txtA728PORDES', Ext.util.Format.number(beanA728.A728PORDES, '0,000.00'));
        this.setValue('txtA728CSOVER', Ext.util.Format.number(beanA728.A728CSOVER, '0,000.00'));
        this.setValue('txtA728QSOVER', Ext.util.Format.number(beanA728.A728QSOVER, '0,000.00'));
        this.setValue('txtA728SECDS', beanA728.A728SECOR.trim() + beanA728.A728SECDS.trim());
        this.setValue('txtA728RUTORG', beanA728.A728RUTORG.trim());
        this.setValue('txtA728FBASE1', beanA728.A728FBASE1.trim());
        this.setValue('txtA728LOHO', beanA728.A728LOHO.trim());
        this.setValue('txtA728RERUT', beanA728.A728RERUT.trim());
        me.storeProrrate.loadData(lista);
        Ext.getCmp(prototype.id + '-gridData2').bindStore(me.storeProrrate);
    },
    btnLog_clickHandler: function() {
        global.Msg({msg: 'Under Construction'});
    },
    btnShowTaxes_clickHandler: function() {
        global.Msg({msg: 'Under Construction'});
    },
    btnShowComments_clickHandler: function() {
        global.Msg({msg: 'Under Construction'});
    },
    imgNext_clickHandler: function() {
        global.Msg({msg: 'Under Construction'});
    },
    btnNucRoe_clickHandler: function() {
        global.Msg({msg: 'Under Construction'});
    },
    imgBack2_clickHandler: function() {
        Ext.getCmp(prototype.id + '-centerC').setVisible(true);
        Ext.getCmp(prototype.id + '-ScreenProrrate').setVisible(false);
    }
});
