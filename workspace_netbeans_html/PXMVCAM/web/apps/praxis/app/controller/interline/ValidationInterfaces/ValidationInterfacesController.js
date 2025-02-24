Ext.define('Ext.Praxis.controller.interline.ValidationInterfaces.ValidationInterfacesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ValidationInterfacesController',
    fecha: new Date(),
    objA3096: {},
    bean: {},
    beanTicket: {},
    beanExcel: {},
    beanDetDay: {},
    beanDebits: {},
    loadDate: '',
    searchParams: {},
    paramsObtainData: {},
    paramsDetail: {},
    me: '',
    childs: '',
    drillDown: [],
    gridActual: '-boxMainData',
    boxActual: '-vskMain',
    pagginActual: '-paggin',
    user: '',
    columnCode: '',
    init: function (view) {
        me = this;
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        prototype.urlBank = CONTEXTPATH + '/BankReconciliation';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetalle';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        console.log(this.childS, 'HIJOSSSS')
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ValidationInterfacesForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ValidationInterfacesForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ValidationInterfacesForm-btnClear': {
                click: this.btnClear_click
            },
            '#ValidationInterfacesForm-btnBack': {
                click: this.btnBack_click
            },
            '#ValidationInterfacesForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ValidationInterfacesForm-cmbDateToYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ValidationInterfacesForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ValidationInterfacesForm-cmbDateFromDay': {
                afterrender: this.afterRenderDay,
                select: this.selectComboFromDay
            },
            '#ValidationInterfacesForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#ValidationInterfacesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ValidationInterfacesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ValidationInterfacesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ValidationInterfacesForm-btn-pag-last': {
                click: this.pagLast
            },
            '#ValidationInterfacesForm-btnTxtLayoutBsplink': {
                click: this.btnTxtLayoutBsplink
            },
            '#ValidationInterfacesForm-btnTxtLayoutBsplink_UATP': {
                click: this.btnTxtLayoutBsplink_UATP
            },
            '#ValidationInterfacesForm-btnTxtLayoutBsplink_UATPUnif': {
                click: this.btnTxtLayoutBsplink_UATPUnif
            },
            '#ValidationInterfacesForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ValidationInterfacesForm-btnLog': {
                click: this.executeLog
            },
            '#ValidationInterfacesForm-btnExcelLog': {
                click: this.btnExcelLog_click
            },
        });

    },
    init_this: function () {
        me = this;
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        this.btnSearch_click();
    },
    setStoreData: function () {
        // Obtener la fecha de ayer
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        var month = yesterday.getMonth() + 1;
        var day = yesterday.getDate();
        var year = yesterday.getFullYear();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYearVa').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthVa').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDayVa').bindStore(storeComboDataDay);
        
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYearVa').setValue(year);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthVa').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateFromDayVa').setValue(day); // Ahora se establece el día de ayer
    
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
    
        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SDATE", "Sales Date"],
                ["PAYDATE", "Payment Date"]
            ]
        }));
        cmbFecFiltro.setValue("SDATE");
        
        var cmbNEGOC = Ext.getCmp(prototype.id + '-cmbNEGOC');
        cmbNEGOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                
                ["1", "PASAJES"],
                ["2", "CARGO"],
                ["3", "CORREO"],
                ["S", "STANDBY"],
            ]
        }));
        cmbNEGOC.setValue("");
        
        this.paramsObtainData.BANK = 2;
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.CARD = 2;
        this.paramsObtainData.COREP = 2;
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);


                me.lstBank = res.lstBank;
                me.lstCard = res.lstCard;
                me.lstCountry = res.lstCountry;
                var lstProcessor = res.lstProcessor;
                console.log(lstProcessor,'lstProcessor')
                var storeData = Ext.create('Ext.data.Store', {
                    data: me.lstBank,
                    autoLoad: true
                });
                var storeData2 = Ext.create('Ext.data.Store', {
                    data: me.lstCard,
                    autoLoad: true
                });
                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });

                var storeDataProcessor = Ext.create('Ext.data.Store', {
                    data: lstProcessor,
                    autoLoad: true
                });

//                Ext.getCmp(prototype.id + '-cmbBank').bindStore(storeData);
//                Ext.getCmp(prototype.id + '-cmbCardType').bindStore(storeData2);
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCOREP').bindStore(storeDataProcessor);
//                Ext.getCmp(prototype.id + '-cmbBank').setValue('');
//                Ext.getCmp(prototype.id + '-cmbCardType').setValue('');
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                Ext.getCmp(prototype.id + '-cmbCOREP').setValue('');
//                global.clear();
//                me.btnSearch_click();
            }
        });
        
        Ext.Ajax.request({
            url: prototype.urlBank + '/obtainMessagesF',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {

                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.bean_detail = res.result;
                    //llenar grilla gridDataInfoScan
                    var storeDataC = Ext.create('Ext.data.Store', {
                        data: res.dataC,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbCOMENTF').bindStore(storeDataC);
                    Ext.getCmp(prototype.id + '-cmbCOMENTF').setValue('');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
        });
        
    },
    viewFilter: function () {
        let getFilters = Ext.getCmp(prototype.id + '-typeGrid').getValue();
        
        console.log(getFilters, 'VIEW GRID')
        
        if (getFilters == 1) {
            Ext.getCmp(prototype.id + '-typeClient').show();
            Ext.getCmp(prototype.id + '-spacer1').show();
            Ext.getCmp(prototype.id + '-cmbDateFromYearVa').show();
            Ext.getCmp(prototype.id + '-cmbDateFromMonthVa').show();
            Ext.getCmp(prototype.id + '-cmbDateFromDayVa').show();
            Ext.getCmp(prototype.id + '-spacer2').show();
            Ext.getCmp(prototype.id + '-interface').show();
            Ext.getCmp(prototype.id + '-spacer3').show();
            Ext.getCmp(prototype.id + '-referencia').show();
            
            Ext.getCmp(prototype.id + '-cmbFecFiltro').hide();
            Ext.getCmp(prototype.id + '-spacerB2').hide();
            Ext.getCmp(prototype.id + '-cmbDateToYear').hide();
            Ext.getCmp(prototype.id + '-cmbDateToMonth').hide();
            Ext.getCmp(prototype.id + '-cmbDateToDay').hide();
            Ext.getCmp(prototype.id + '-spacerB1').hide();
            Ext.getCmp(prototype.id + '-cmbDateFromYear').hide();
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').hide();
            Ext.getCmp(prototype.id + '-cmbDateDay').hide();
            Ext.getCmp(prototype.id + '-spacerB3').hide();
            Ext.getCmp(prototype.id + '-cmbCountry').hide();
            Ext.getCmp(prototype.id + '-txtCard1').hide();
            Ext.getCmp(prototype.id + '-spacerB4').hide();
            Ext.getCmp(prototype.id + '-spacerB5').hide();
            Ext.getCmp(prototype.id + '-txtCard2').hide();
            Ext.getCmp(prototype.id + '-spacerB6').hide();
            Ext.getCmp(prototype.id + '-txtAUTHOC').hide();
            Ext.getCmp(prototype.id + '-FilterB').hide();
        } else {
            Ext.getCmp(prototype.id + '-typeClient').hide();
            Ext.getCmp(prototype.id + '-spacer1').hide();
            Ext.getCmp(prototype.id + '-cmbDateFromYearVa').hide();
            Ext.getCmp(prototype.id + '-cmbDateFromMonthVa').hide();
            Ext.getCmp(prototype.id + '-cmbDateFromDayVa').hide();
            Ext.getCmp(prototype.id + '-spacer2').hide();
            Ext.getCmp(prototype.id + '-interface').hide();
            Ext.getCmp(prototype.id + '-spacer3').hide();
            Ext.getCmp(prototype.id + '-referencia').hide();
            
            Ext.getCmp(prototype.id + '-cmbFecFiltro').show();
            Ext.getCmp(prototype.id + '-spacerB2').show();
            Ext.getCmp(prototype.id + '-cmbDateToYear').show();
            Ext.getCmp(prototype.id + '-cmbDateToMonth').show();
            Ext.getCmp(prototype.id + '-cmbDateToDay').show();
            Ext.getCmp(prototype.id + '-spacerB1').show();
            Ext.getCmp(prototype.id + '-cmbDateFromYear').show();
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').show();
            Ext.getCmp(prototype.id + '-cmbDateDay').show();
            Ext.getCmp(prototype.id + '-spacerB3').show();
            Ext.getCmp(prototype.id + '-cmbCountry').show();
            Ext.getCmp(prototype.id + '-txtCard1').show();
            Ext.getCmp(prototype.id + '-spacerB4').show();
            Ext.getCmp(prototype.id + '-spacerB5').show();
            Ext.getCmp(prototype.id + '-txtCard2').show();
            Ext.getCmp(prototype.id + '-spacerB6').show();
            Ext.getCmp(prototype.id + '-txtAUTHOC').show();
            Ext.getCmp(prototype.id + '-FilterB').show();
        }
        
    },
    btnSearch_click: function () {
        this.viewFilter();
        this.setFormatParameter();
        this.search();
    },
    setFormatParameter: function () {
        let getFilters = Ext.getCmp(prototype.id + '-typeGrid').getValue();
        
        if (getFilters == 1) {
            me.bean = {};
            let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
            let getInterface = Ext.getCmp(prototype.id + '-interface').getValue();
            let getReferencia = Ext.getCmp(prototype.id + '-referencia').getValue();
            let getExtractionDate = Ext.getCmp(prototype.id + '-cmbDateFromYearVa').getValue() +
                                    Ext.getCmp(prototype.id + '-cmbDateFromMonthVa').getValue()+
                                    Ext.getCmp(prototype.id + '-cmbDateFromDayVa').getValue();

            me.bean.IN_CCUST = getCustomer;
            me.bean.IN_EXTRACTION_DATE = getExtractionDate;
            me.bean.IN_INTERFACE = getInterface;
            me.bean.IN_REFERENCIA = getReferencia;
            me.panelActual = '-vskMain';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            this.searchParams.beanString = JSON.stringify(me.bean);
            console.log(me.bean, 'me.bean')
        } else {
            this.beanDetDay = {};
            this.beanDetDay.IN_CARDN1 = '';
            this.beanDetDay.IN_CARDN2 = '';
            this.beanDetDay.IN_SCARDNCOR = '';
            this.beanDetDay.IN_SAUTHOC = '';
            this.beanDetDay.IN_SDATE = '';
            this.beanDetDay.IN_STVAL = '';
            this.beanDetDay.IN_TDOC = '';
            this.beanDetDay.IN_COUNTRY = '';
            this.beanDetDay.IN_NEGOC = '';
            this.beanDetDay.IN_COMENT = '';
            this.beanDetDay.IN_AGENCY = '';
            
            console.log('cmbStatus:', Ext.getCmp(prototype.id + '-cmbStatus').getValue());
            
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-txtAUTHOC').getValue().trim() !== '' ||
                    this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbNEGOC')) !== ''
                    || Ext.getCmp(prototype.id + '-cmbCOMENTF').getValue() !== '' || Ext.getCmp(prototype.id + '-txtAGENCY').getValue() !== ''
                    || this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbStatus')) !== '' 
                    || this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbSource')) !== ''
                    || Ext.getCmp(prototype.id + '-cmbDateDay').getValue() !== '' || Ext.getCmp(prototype.id + '-cmbDateToDay').getValue() !== ''
                    || this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbSource')) !== '' || Ext.getCmp(prototype.id + '-txtBANDOC').getValue() !== '' ) {

                
                this.beanDetDay.TYPEDATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue() === 'PAYDATE' ? 'P' : 'S';
                this.beanDetDay.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateDay').getValue();
                this.beanDetDay.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
                this.beanDetDay.IN_TDOC = this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbTDOC'));
                this.beanDetDay.IN_STVAL = this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbStatus'));
                this.beanDetDay.IN_FTE = this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbSource'));
                this.beanDetDay.IN_COREP = this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbCOREP'))
                this.beanDetDay.IN_BANDOC = win.getValue('txtBANDOC');

                me.panelActual = '-panelGridDataDetalle';
                global.selectedChild(me.childs, prototype.id + me.panelActual);

                if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() !== '' && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '') {
                    if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim().length === 6 && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                        this.beanDetDay.IN_CARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue().trim();
                        this.beanDetDay.IN_CARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();

                    } else {
                        global.Msg({
                            msg: 'Credit Card Number must contain 10 digits.'
                        });
                        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
                        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
                    }
                } else if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() === '' && Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '') {
                    if (Ext.getCmp(prototype.id + '-txtCard2').getValue().trim().length === 4) {
                        this.beanDetDay.IN_SCARDNCOR = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();
                    } else {
                        global.Msg({
                            msg: 'Correlative Number must contain 4 digits.'
                        });
                        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
                    }
                }
                
                this.beanDetDay.IN_SAUTHOC = Ext.getCmp(prototype.id + '-txtAUTHOC').getValue().trim();
                this.beanDetDay.IN_NEGOC = this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbNEGOC'));
                this.beanDetDay.IN_COMENT = Ext.getCmp(prototype.id + '-cmbCOMENTF').getValue().trim();
                this.beanDetDay.IN_AGENCY = Ext.getCmp(prototype.id + '-txtAGENCY').getValue().trim();
                this.beanDetDay.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() ? Ext.getCmp(prototype.id + '-cmbCountry').getValue() : '';
                this.beanDetDay.IN_strSVFOP = win.getValue('txtAMOUNT').replace(/,/g, '');
                console.log(this.beanDetDay, 'this.beanDetDay')
                this.paramsDetail.beanString = JSON.stringify(this.beanDetDay);

            } else if (this.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbTDOC')) === 'D') {
                this.beanDebits.strFecFiltro = win.getValue('cmbFecFiltro');
                this.beanDebits.strYearFrom = win.getValue('cmbDateFromYear');
                this.beanDebits.strMonthFrom = win.getValue('cmbDateFromMonth');
                this.beanDebits.strYearTo = win.getValue('cmbDateToYear');
                this.beanDebits.strMonthTo = win.getValue('cmbDateToMonth');
                this.beanDebits.IN_COUNTRY = win.getValue('cmbCountry');
                this.beanDebits.IN_CARDC = win.getValue('cmbCardType');
                this.beanDebits.IN_CARDN1 = win.getValue('txtCard1').trim();
                this.beanDebits.IN_CARDN2 = win.getValue('txtCard2').trim();
                this.beanDebits.IN_MERCHN = win.getValue('txtMERCHN').trim();
                this.beanDebits.IN_AUTHNBR = win.getValue('txtAUTHOC').trim();
                this.beanDebits.IN_SAGENT = win.getValue('txtAGENCY').trim();
                console.log(this.beanDebits, 'ACAAAAAAAAAAAAAAAAAAA 2')
//                this.searchDebits(this.beanDebits)

            } else {
                console.log(this.beanDebits, 'ACAAAAAAAAAAAAAAAAAAA 3')
//                this.setFormatParameter();
//                this.setGridDataMain(obj, e);
            }
        }
        
    },
    search: function () {
        let getFilters = Ext.getCmp(prototype.id + '-typeGrid').getValue();
        
        if (getFilters == 1) {
            Ext.getCmp(prototype.id + '-panelMain').setHeight(650);
            let lstData = []
//            this.showGrid('-vskMain');

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchAccountingInterfaces'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = me.searchParams;
                    },
                    load: function(obj) {
                        console.log(obj,'obj')
                        var pag = Ext.getCmp(prototype.id + '-paggin2');
                        var pagData = pag.getPageData();
                        console.log(pagData,'pagData')

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
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-panelMain').setHeight(630);
            win.lblUser_toolTip("Estructura: MPF101");
            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetalle'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        console.log(obj,'obj')
                        var pag = Ext.getCmp(prototype.id + '-paggin');
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
                            var title = '';


                            if (bean.TDOC != 'S') {
                                Ext.getCmp(prototype.id + '-ColumnDateDetalle').setText('Trans.<br>Date');
                            } else {
                                Ext.getCmp(prototype.id + '-ColumnDateDetalle').setText('Sales<br>Date');
                            }

                            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-txtCard2').getValue().trim() !== '' || Ext.getCmp(prototype.id + '-txtAUTHOC').getValue().trim() !== '' || me.joinMultiSelect(Ext.getCmp(prototype.id + '-cmbNEGOC')) !== '' || Ext.getCmp(prototype.id + '-cmbCOMENTF').getValue() !== '' || Ext.getCmp(prototype.id + '-txtAGENCY').getValue() !== '') {
                                title = " ";
                            } else {
                                title = " Sales Date : " + bean.SDATE + " - Country : " + bean.IN_COUNTRY;
                            }

                            console.log(title);
                            console.log(bean);
                        }
//                        me.setWidthPie();
                    }
                }
            });
            global.clear();

            Ext.getCmp(prototype.id + '-gridDataDetalle').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        }
    },
    showGrid: function (nameGrid) {

        if (me.drillDown.indexOf(nameGrid) === -1) {
            var paginacion = Ext.getCmp(prototype.id + '-boxPag');
            //Mostrar paginacion
            if (nameGrid === '-vskMain' || nameGrid === '-panelGridDataDetalle')
            {
                paginacion.setVisible(true);
            } else {
                paginacion.setVisible(false);
            }

            me.drillDown.push(nameGrid);
            Ext.getCmp(prototype.id + me.boxActual).hide();
            me.boxActual = nameGrid;
            Ext.getCmp(prototype.id + me.boxActual).show();
            console.log(me.drillDown,'me.drillDown')
        }
    },
    btnExcel_click: function () {
        this.setFormatParameter();
        console.log(this.searchParams,'this.searchParams')
        Ext.Msg.show({
            title: '.:PRAXISEX:.',
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
    exportExcel: function() {
        console.log(this.boxActual,'this.boxActual')
        console.log(me.boxActual,'this.boxActual')
        if (this.boxActual === '-boxMainData') {
            console.log('entre excel')
            me.goURLpost('excelAccountingInterfaces', this.searchParams.beanString, Ext.getCmp(prototype.id + '-gridData').config.columns.items);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataDetalle':
                me.pagginActual = '-paggin';
                break;
            case '-vskMain':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridDataDay':
                me.pagginActual = '-paggin3';
                break;
            case '-panelGridDataDetalle':
                me.pagginActual = '-paggin4';
                break;
            case '-panelGridDetCardByS':
                me.pagginActual = '-paggin5';
                break;
            case '-panelGridDetCardNbrByS':
                me.pagginActual = '-paggin6';
                break;
            case '-panelGridDataTicket':
                me.pagginActual = '-paggin7';
                break;
            case '-panelGridDetDayByS':
                me.pagginActual = '-paggin8';
                break;
            case '-boxDebitsData':
                me.pagginActual = '-pagginDebits';
                break;
            case '-panelGridDetCardByS_Debits':
                me.pagginActual = '-pagginDebits_country';
                break;
            case '-panelGridDataDetalle_DEBITS':
                me.pagginActual = '-pagginDebits_detail';
                break;
        }

    },
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        console.log(this.getPaggin(), 'this.getPaggin')
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        console.log(pag, 'pag')
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    goURLpost: function (method, parms, columns) {

        var js_columns = JSON.stringify(columns);
        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' + method + '?dw_excel=true';
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "beanString";
        mapInput.value = parms;
        mapForm.appendChild(mapInput);
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        document.body.appendChild(mapForm);
        mapForm.submit();
    },
    tarjeta_keyDownHandler: function (e, eOpts) {
        if (eOpts.getKey() !== 9 && eOpts.getKey() !== 16) {
            if (Ext.getCmp(prototype.id + '-txtCard1').getValue().length === 6) {
                Ext.getCmp(prototype.id + '-txtCard2').focus();
            }
        }
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    joinMultiSelect: function (element){
        let comboBox = element.getValue();
        return comboBox.join('|');
    },
    selectedChild: function (padre, child, add) {
        add = add === undefined ? true : add;
        if (add && this.peek() !== prototype.id + '-' + child)
            this.stack.push(prototype.id + '-' + child);
        win.selectedChild(padre, child);
        var paggin = this.getPaggin();
        if (paggin === null) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-boxPagDetail').hide();
            console.log('NIKAAAAAAAAAA')
        } else {
            var pagData = paggin.getPageData();
            console.log('selectedChild');
            console.log(padre + child + add);
            console.log(Ext.getCmp(prototype.id + '-paggin9'));
            console.log(paggin);
            console.log(pagData);

            var currentPage = win.formatLngNumber(pagData.currentPage);
            var pageCount = win.formatLngNumber(pagData.pageCount);
            var total = win.formatLngNumber(pagData.total);

            win.setText('lblPagActual', currentPage);
            win.setText('lblPagTotal', pageCount);
            win.setText('lblRowsTotal', total);

            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-boxPagDetail').show();

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + child).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-boxPagDetail').setWidth(width);
        }
    },
});