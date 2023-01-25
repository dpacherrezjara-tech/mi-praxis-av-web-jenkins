/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.interline.GSACommisionsReport.GSACommisionsReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GSACommisionsReportController',
    fecha: new Date(),
    childs: '',
    bean: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        me = this;
        prototype.id = 'GSACommisionsReportForm';
        prototype.url = CONTEXTPATH + '/GSACommisionsReport';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-panelFilterMain').setVisible(false);
        Ext.getCmp(prototype.id + '-panelSearchPOLIZ').setVisible(false);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#GSACommisionsReportForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#GSACommisionsReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#GSACommisionsReportForm-btnClear': {
                click: this.btnClear_click
            },
            '#GSACommisionsReportForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#GSACommisionsReportForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#GSACommisionsReportForm-btnBack': {
                click: this.btnBack_click
            },
            '#GSACommisionsReportForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#GSACommisionsReportForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#GSACommisionsReportForm-btn-pag-next': {
                click: this.pagNext
            },
            '#GSACommisionsReportForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#GSACommisionsReportForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#GSACommisionsReportForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#GSACommisionsReportForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#GSACommisionsReportForm-radiogroup1': {
                change: this.onChRadiogroup
            },
            '#GSACommisionsReportForm-radiogroup2': {
                change: this.onChRadiogroup2
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onChRadiogroup: function(obj, value) {
        this.btnSearch_click();
    },
    onChRadiogroup2: function(obj, value) {
        var opt = value.rb2;
        console.log(opt);
        switch (opt) {
            case 'btn1':
                me.panelActual = '-panelPoliza';
                global.selectedChild(me.childs, prototype.id + me.panelActual);

                break;
            case 'btn2':
                me.panelActual = '-panelLIQUIDACION';
                global.selectedChild(me.childs, prototype.id + me.panelActual);

                break;
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    setStoreData: function() {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");


        var cmbFecha = Ext.getCmp(prototype.id + '-cmbFecha');
        cmbFecha.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Flight Date"],
                ["2", "Sale Date"]
            ]
        }));
        cmbFecha.setValue('1');

        var cmbArea = Ext.getCmp(prototype.id + '-cmbArea');
        cmbArea.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"]
            ]
        }));
        cmbArea.setValue("");
        var cmbZona = Ext.getCmp(prototype.id + '-cmbZona');
        cmbZona.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["60", "Alberta"],
                ["61", "British Columbia"],
                ["62", "Manitoba"],
                ["63", "New Brunswick"],
                ["64", "New Foundland"],
                ["65", "Northwest Territories"],
                ["66", "Nova Scotia"],
                ["67", "Ontario"],
                ["68", "Prince Edward Island"],
                ["69", "Quebec"],
                ["70", "Saskatchewan"],
                ["71", "Yukon Territory"]
            ]
        }));
        cmbZona.setValue("");

        var cmbCurrency = Ext.getCmp(prototype.id + '-cmbCurrency');
        cmbCurrency.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["USD", "USD"],
                ["EUR", "EUR"],
                ["MXN", "MXN"]
            ]
        }));
        cmbCurrency.setValue("USD");

        var cmbAgente = Ext.getCmp(prototype.id + '-cmbAgente');
        cmbAgente.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["AEROMAR", "Aeromar"],
                ["ATR", "ATR"],
                ["AVIAREPS", "Aviareps"],
                ["BENELUX", "Benelux"],
                ["BORDER AIR", "Border Air"],
                ["DISCOVER", "Discover"],
                ["ELITE HOLIDAY", "Elite Holiday"],
                ["GSA Canada", "GSA Canada"],
                ["MEGACAP", "Megacap"],
                ["MORAN S MARKETING", "Moran's Marketing"],
                ["N/E", "N/E"],
                ["No Group", "No Group"],
                ["PACIFIC AIR", "Pacific Air"],
                ["SIMA", "Sima"],
                ["STIC", "STIC"],
                ["TAKE OFF", "Take Off"],
                ["TRANSCT", "Transct"],
                ["TRAVELEXCELLENCE CORP.", "Travelexcellence Corp."]
            ]
        }));
        cmbAgente.setValue("");

        var cmbRegion = Ext.getCmp(prototype.id + '-cmbRegion');
        cmbRegion.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["CENTROAMERICA", "Centro America"],
                ["OCEANIA", "Oceania"],
                ["EUROPA", "Europa"],
                ["MEDIO ORIENTE", "Medio Oriente"],
                ["ASIA", "Asia"],
                ["SUDAMERICA", "Sudamerica"],
                ["NORTEAMERICA", "Norteamerica"],
                ["AFRICA", "Africa"]
            ]
        }));
        cmbRegion.setValue("");

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainDataAirline_Country_City',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstAirlines = res.lstAirlines;
                var lstCiudades = res.lstCiudades;
                var lstPaises = res.lstPaises;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstAirlines,
                    autoLoad: true
                });
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: lstCiudades,
                    autoLoad: true
                });
                var storeData3 = Ext.create('Ext.data.Store', {
                    data: lstPaises,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCity').bindStore(storeData2);
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
                Ext.getCmp(prototype.id + '-cmbCity').setValue('');
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                global.clear();
                me.btnSearch_click();
            }
        });
    },
    setFormatParameter: function() {

        me.bean = {};
        me.bean.IN_TYPE = Ext.getCmp(prototype.id + '-cmbFecha').getValue();
        me.bean.yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_DATE_FROM = me.bean.yearFrom + '' + me.bean.monthFrom;
        me.bean.IN_DATE_TO = me.bean.yearTo + '' + me.bean.monthTo;
        me.bean.IN_CIA = Ext.getCmp(prototype.id + '-cmbAerolinea').getValue();
        me.bean.IN_MONED = Ext.getCmp(prototype.id + '-cmbCurrency').getValue();
        me.bean.IN_CAREA = Ext.getCmp(prototype.id + '-cmbArea').getValue();
        me.bean.IN_CCITY = Ext.getCmp(prototype.id + '-cmbCity').getValue();
        me.bean.IN_CZONA = Ext.getCmp(prototype.id + '-cmbZona').getValue();
        me.bean.IN_REGIO = Ext.getCmp(prototype.id + '-cmbRegion').getValue();
        me.bean.IN_CPISO = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_GROUPA = Ext.getCmp(prototype.id + '-cmbAgente').getValue();
        me.bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.chckBtn = Ext.getCmp(prototype.id + '-radiogroup1').lastValue.rb;

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString
        };
        console.log(me.bean);
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        if (me.bean.IN_TKT !== '') {
            if (me.bean.IN_TKT.length === 13) {
                //roBwrGSACommisionsReportIP.searchTKT(bean20);			
            } else {
                global.Msg({
                    msg: 'Ticket number must contain 13 digits.'
                });
            }

        } else {

            switch (me.bean.chckBtn) {
                case 'btn1':
                    this.setGridData();
                    break;
                case 'btn2':
                    this.setGridDataCIA();
                    break;
                case 'btn3':
                    this.setGridDataPAIS();
                    break;
                case 'btn4':
                    this.setGridDataAGENTE();
                    break;
            }

        }
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: WRF070");

        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="setGridDataCIA">

    setGridDataCIA: function() {
        win.lblUser_toolTip("Estructura: WRF070");

        me.panelActual = '-panelGridDataCIA';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchCIA'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCIA').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="setGridDataPAIS">

    setGridDataPAIS: function() {
        win.lblUser_toolTip("Estructura: WRF070");

        me.panelActual = '-panelGridDataPAIS';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchPAIS'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin3');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var bean = obj.data.items[0].data;
                            var title = 'Date: ' + bean.IN_DATE_FROM + '  ' + ' Agent: ' + bean.IN_GROUPA + '';
                            Ext.getCmp(prototype.id + '-labelTitle3').setText(title);
                        }

                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataPAIS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="setGridDataAGENTE">

    setGridDataAGENTE: function() {
        win.lblUser_toolTip("Estructura: WRF070");

        me.panelActual = '-panelGridDataAGENTE';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchAGENTE'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var bean = obj.data.items[0].data;
                            var title = 'Date: ' + bean.IN_DATE_FROM + '   ' + ' Country: ' + bean.IN_CPISO + '   ' + ' Airline: ' + bean.IN_CIA;
                            Ext.getCmp(prototype.id + '-labelTitle4').setText(title);
                        }

                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAGENTE').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>


    setGridDataDetailPAIS: function(data) {
        console.log('setGridDataDetailPAIS');
        win.lblUser_toolTip("Estructura: WRF070");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchPAIS'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = 'Date: ' + bean.strDATE + '/' + bean.IN_DATE_FROM + '   ' + ' Agent: ' + bean.IN_GROUPA + '';
                        Ext.getCmp(prototype.id + '-labelTitle3').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataPAIS').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    setGridDataDetailAGENTE: function(data) {
        win.lblUser_toolTip("Estructura: WRF070");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchAGENTE'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin4');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = 'Date: ' + bean.strDATE + '/' + bean.IN_DATE_FROM + '   ' + ' Country: ' + bean.IN_CPISO + '   ' + ' Airline: ' + bean.IN_CIA;
                        Ext.getCmp(prototype.id + '-labelTitle4').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataAGENTE').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    onViewDataDetailAGENTE: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataAGENTE';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetailAGENTE();
    },
    onViewDataDetailPAIS: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        var option = Ext.getCmp(prototype.id + '-radiogroup1').lastValue.rb;
        if (option === 'btn1' || option === 'btn4') {
            me.panelActual = '-panelGridDataPAIS';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.setGridDataDetailPAIS();
        } else if (option === 'btn2' || option === 'btn3') {
            me.panelActual = '-panelGridDataTKTDetail';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.setGridDataTKTDetail();
        }
    },
    setGridDataTKTDetail: function() {
        win.lblUser_toolTip("Estructura: WRF070");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchTKTDetail'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin5');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                        var title = 'Date: ' + bean.strDATE + '/' + bean.IN_DATE_FROM + '   ' + ' Agent: ' + bean.IN_GROUPA + '   ' + ' Country: ' + bean.A1462CPISO + '   ' + ' Airline: ' + bean.A1462CIA;
                        Ext.getCmp(prototype.id + '-labelTitle5').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataTKTDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
    },
    onViewDataDetailTKTDetail: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataTKTDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataTKTDetail();
    },
    setGriDataPolizaLiquid: function() {
        win.lblUser_toolTip("Estructura: A1462");
        Ext.Ajax.request({
            url: prototype.url + '/searchPOLIZ_LIQUIagente',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-panelPoliza').mask('Loading...'),
            params: me.paramsDetail,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-panelPoliza').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstLIQUI = res.lstLIQUI;
                var lstPOLIZ = res.lstPOLIZ;

                var storeData = Ext.create('Ext.data.Store', {
                    data: lstLIQUI,
                    autoLoad: true
                });
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: lstPOLIZ,
                    autoLoad: true
                });

                if (lstPOLIZ.length > 0) {
                    var item = lstPOLIZ[0];
                    Ext.getCmp(prototype.id + '-dblTotCom5').setText(item.dblTotCom);
                    Ext.getCmp(prototype.id + '-dblTotCom6').setText(item.dblTotCom);
                    Ext.getCmp(prototype.id + '-dblTotCom7').setText(item.dblTotCom);
                    Ext.getCmp(prototype.id + '-txtOrigen2').setText(item.IN_TKT);

                    Ext.getCmp(prototype.id + '-txtTipo').setValue('PRAXIS');
                    Ext.getCmp(prototype.id + '-txtExplicacion').setValue(item.DES_CPISO);
                    Ext.getCmp(prototype.id + '-txtFechaReporte').setValue(item.strDATE);
                    Ext.getCmp(prototype.id + '-txtPeriodo').setValue(item.IN_DATE_FROM);
                    Ext.getCmp(prototype.id + '-txtOrigen').setValue(item.IN_TKT);

                    Ext.getCmp(prototype.id + '-txtCantidad').setValue('DLV');
                    Ext.getCmp(prototype.id + '-txtMoneda').setValue(item.IN_MONED);
                    Ext.getCmp(prototype.id + '-txtFechalm').setValue(item.strDATE);
                    Ext.getCmp(prototype.id + '-gridDataLIQUIagente').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-gridDataPOLIZA').bindStore(storeData2);
                }
            }
        });
    },
    onBtnPOLIZA: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        Ext.getCmp(prototype.id + '-panelSearchPOLIZ').setVisible(true);
        Ext.getCmp(prototype.id + '-panelSearch').setVisible(false);
        Ext.getCmp(prototype.id + '-pie').setVisible(false);

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelPoliza';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGriDataPolizaLiquid();
    },
    setGridDataDetailLIQUIDACION: function() {
        win.lblUser_toolTip("Estructura: A1462");
        Ext.Ajax.request({
            url: prototype.url + '/searchLIQUI',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataLIQUI').mask('Loading...'),
            params: me.paramsDetail,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataLIQUI').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var lst = res.lst;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lst,
                    autoLoad: true
                });

                if (lst.length > 0) {
                    var item = lst[0];
                    Ext.getCmp(prototype.id + '-dblTotCom8').setText(item.dblTotCom);
                    Ext.getCmp(prototype.id + '-dblTotCom10').setText(item.dblTotCom);

                    Ext.getCmp(prototype.id + '-txtOrigen3').setText(item.IN_TKT);

                    Ext.getCmp(prototype.id + '-txtTipo1').setValue('PRAXIS');
                    Ext.getCmp(prototype.id + '-txtExplicacion1').setValue(item.IN_GROUPA);
                    Ext.getCmp(prototype.id + '-txtFechaReporte1').setValue(item.strDATE);
                    Ext.getCmp(prototype.id + '-txtPeriodo1').setValue(item.IN_DATE_FROM);
                    Ext.getCmp(prototype.id + '-txtOrigen1').setValue(item.IN_TKT);

                    Ext.getCmp(prototype.id + '-txtCantidad1').setValue('DLV');
                    Ext.getCmp(prototype.id + '-txtMoneda1').setValue(item.IN_MONED);
                    Ext.getCmp(prototype.id + '-txtFechalm1').setValue(item.strDATE);

                    Ext.getCmp(prototype.id + '-gridDataLIQUI').bindStore(storeData);
                }
            }
        });
    },
    onViewDataDetailLIQUIDACION: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetailLIQUIDACION();
    },
    setGriDataPolizaLiquidDetail: function() {
        win.lblUser_toolTip("Estructura: A1462");
        Ext.Ajax.request({
            url: prototype.url + '/searchLIQUIdetalle',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridDataLIQUIdetail').mask('Loading...'),
            params: me.paramsDetail,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataLIQUIdetail').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var lst = res.lst;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lst,
                    autoLoad: true
                });

                if (lst.length > 0) {
                    var item = lst[0];
                    Ext.getCmp(prototype.id + '-dblTotCom12').setText(item.dblTotCom);
                    Ext.getCmp(prototype.id + '-dblTotCom13').setText(item.dblTotCom);

                    Ext.getCmp(prototype.id + '-txtOrigen5').setText(item.IN_TKT);

                    Ext.getCmp(prototype.id + '-txtTipo2').setValue('PRAXIS');
                    Ext.getCmp(prototype.id + '-txtExplicacion2').setValue(item.IN_GROUPA);
                    Ext.getCmp(prototype.id + '-txtFechaReporte2').setValue(item.strDATE);
                    Ext.getCmp(prototype.id + '-txtPeriodo2').setValue(item.IN_DATE_FROM);
                    Ext.getCmp(prototype.id + '-txtOrigen4').setValue(item.IN_TKT);

                    Ext.getCmp(prototype.id + '-txtCantidad2').setValue('DLV');
                    Ext.getCmp(prototype.id + '-txtMoneda2').setValue(item.IN_MONED);
                    Ext.getCmp(prototype.id + '-txtFechalm2').setValue(item.strDATE);

                    Ext.getCmp(prototype.id + '-gridDataLIQUIdetail').bindStore(storeData);
                }
            }
        });
    },
    onViewLIQUIDACIONdetail: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelLIQUIDACIONDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGriDataPolizaLiquidDetail();
    },
    validateFields: function() {
        var msj = '';
        return msj;
    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();
            if (me.panelActual !== '-panelPoliza') {
                Ext.getCmp(prototype.id + '-panelSearchPOLIZ').setVisible(false);
                Ext.getCmp(prototype.id + '-panelSearch').setVisible(true);
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
            }
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function(obj, e) {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
        Ext.getCmp(prototype.id + '-cmbPeriod').setValue('');

    },
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
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
        }
    },
    exportExcel: function() {
        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.openWindowWithPost(prototype.url + '/getXLSX/','beanString',searchParams.beanString);
                break;
            case '-panelGridDataCIA':
                global.openWindowWithPost(prototype.url + '/getXLSXCIA/','beanString',searchParams.beanString);
                //global.getFile(prototype.url + '/getXLSXCIA?beanString=' + searchParams.beanString);
                break;
            case '-panelGridDataPAIS':
                global.openWindowWithPost(prototype.url + '/getXLSXPAIS/','beanString',searchParams.beanString);
                //global.getFile(prototype.url + '/getXLSXPAIS?beanString=' + searchParams.beanString);
                break;
            case '-panelGridDataPAIS':
                global.openWindowWithPost(prototype.url + '/getXLSXPAIS/','beanString',searchParams.beanString);
                //global.getFile(prototype.url + '/getXLSXPAIS?beanString=' + searchParams.beanString);
                break;
            case '-panelGridDataAGENTE':
                global.openWindowWithPost(prototype.url + '/getXLSXAGENTE/','beanString',searchParams.beanString);
                //global.getFile(prototype.url + '/getXLSXAGENTE?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-panelFilterMain');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataCIA':
                me.pagginActual = '-paggin2';
                break;
            case  '-panelGridDataPAIS':
                me.pagginActual = '-paggin3';
                break;
            case  '-panelGridDataAGENTE':
                me.pagginActual = '-paggin4';
                break;

        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


});
