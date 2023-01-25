
Ext.define('Ext.Praxis.controller.salesaudit.DocumentsControl.DocumentsControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DocumentsControlController',
    /**
     * Constructor
     */

    beanGeneral: {},
    beanAdmReport: {},
    beanDetalle: {},
    beanAdmSearch: {},
    init: function (view) {
        var me = this;
    },
    OnBeforeShow: function () {
        prototype.id = 'DocumentsControl';
        prototype.id1 = 'ScrFormUnico';

        prototype.url = CONTEXTPATH + '/DocumentsControl';
        prototype.url2 = CONTEXTPATH + '/DisputeGestionBsplink';
        prototype.url03 = CONTEXTPATH + '/ADMReport';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setReasons();
        this.setStoresFilters();
        // this.onLoadUsers();
        this.setStoresGrids();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    setReasons: function () {
        var cmbError = Ext.getCmp(prototype.id + '-CmbReason');
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url2 + '/loadDataInit',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalPorperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    cmbError.setValue('');
                }
            }
        });
        cmbError.setStore(store);
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var cmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin');
        var cmbType = Ext.getCmp(prototype.id + '-type');
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var cmbProcess = Ext.getCmp(prototype.id + '-CmbProcess');
        var CmbTypeReason = Ext.getCmp(prototype.id + '-CmbTypeReason');



        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "PROCESSING DATE"},
                {"code": "2", "name": "ISSUED DATE"},
                {"code": "3", "name": "SYSTEM DATE"}
            ]
        }));

        CmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"}
            ]
        }));

        CmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PR", "name": "REGULAR PROCESS"},
                {"code": "CR", "name": "CREDIT AND COBRANZA"},
                {"code": "VI", "name": "SALE INDIRECTA"},
                {"code": "DI", "name": "SALE DIRECTA"},
                {"code": "CM", "name": "COMMISSION"}
            ]
        }));

        cmbOrigin.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PR", "name": "PROCESO REGULAR"},
                {"code": "MA", "name": "MANUAL"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "MS", "name": "MASSIVE"},
                {"code": "UP", "name": "UPFRONT"}
            ]
        }));

        cmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "ORIGIN"},
                {"code": "2", "name": "STATUS"},
                {"code": "3", "name": "REASON"}
            ]
        }));

        CmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "APPROVED"},
                {"code": "F", "name": "ACCREDITED"},
                {"code": "Z", "name": "AUTHORIZED"},
                {"code": "B", "name": "ACM\ADM NA BSPlink\MM"},
                {"code": "L", "name": "ACM\ADM BSPLINK\MM"},
                {"code": "P", "name": "BILLED"},
                {"code": "I", "name": "BILLED GDS"},
                {"code": "C", "name": "CONDONED"},
                {"code": "U", "name": "CLEARED UP"},
                {"code": "X", "name": "CANCELED"},
                {"code": "D", "name": "DISPUTED"},
                {"code": "E", "name": "REJECTED DISPUTE"},
                {"code": "W", "name": "APPROVED DISPUTE"},
                {"code": "J", "name": "JUSTIFIED"},
                {"code": "O", "name": "IATA DISABLED"},
                {"code": "Y", "name": "PENDING"},
                {"code": "Q", "name": "UNREGISTERED CLIENT"},
                {"code": "N", "name": "REJECTED"},
                {"code": "R", "name": "REAUDITED"}

            ]
        }));
        cmbProcess.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ADM", "name": "ADM"},
                {"code": "ACM", "name": "ACM"},
                {"code": "NTD", "name": "DEBIT NOTE"},
                {"code": "NTC", "name": "CREDIT NOTE"},
                {"code": "FAD", "name": "DEBIT INVOICE"},
                {"code": "FAC", "name": "CREDIT INVOICE"}
            ]
        }));

        CmbTypeReason.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "FA", "name": "FARE"},
                {"code": "CP", "name": "CHARGE/PN"},
                {"code": "CO", "name": "COMMISSION"},
                {"code": "TA", "name": "TAXES"},
                {"code": "LB", "name": "FREE TEXT"},
                {"code": "FP", "name": "FOP"}
            ]
        }));

    },
    OnAmountPorcetaje: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnPorcetajeRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCmbSourceSelect: function (obj, records, eOpts) {

        Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(false);
        var graficos = Ext.getCmp(prototype.id + '-graficos');
        graficos.tab.hide();
        if (obj.getValue() === '5') {
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setVisible(true);
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setVisible(true);
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setVisible(true);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setVisible(true);

            Ext.getCmp(prototype.id + '-txtFilterDateFrom2').setVisible(false);
            Ext.getCmp(prototype.id + '-txtFilterDateTo2').setVisible(false);

        } else {
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setVisible(false);
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').setVisible(false);
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setVisible(false);
            Ext.getCmp(prototype.id + '-cmbDateToMonth').setVisible(false);

            Ext.getCmp(prototype.id + '-txtFilterDateFrom2').setVisible(true);
            Ext.getCmp(prototype.id + '-txtFilterDateTo2').setVisible(true);
        }
        switch (String(obj.getValue())) {
            case '1':
                Ext.getCmp(prototype.id + '-gridReport').setVisible(true);
                Ext.getCmp(prototype.id + '-gridReport3').setVisible(false);
                Ext.getCmp(prototype.id + '-gridReport2').setVisible(false);
                Ext.getCmp(prototype.id + '-CmbTypeReason').setVisible(false);
                Ext.getCmp(prototype.id + '-CmbReason').setVisible(false);
                //graficos.hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-gridReport2').setVisible(true);
                Ext.getCmp(prototype.id + '-gridReport').setVisible(false);
                Ext.getCmp(prototype.id + '-gridReport3').setVisible(false);
                Ext.getCmp(prototype.id + '-CmbTypeReason').setVisible(false);
                Ext.getCmp(prototype.id + '-CmbReason').setVisible(true);
                Ext.getCmp(prototype.id + '-graficos').setVisible(true);
                graficos.tab.show();
                Ext.getCmp(prototype.id + '-tabpanelPrincipal').setActiveTab(0);
                break;
            case '3':
                Ext.getCmp(prototype.id + '-gridReport3').setVisible(true);
                Ext.getCmp(prototype.id + '-CmbTypeReason').setVisible(true);
                Ext.getCmp(prototype.id + '-CmbReason').setVisible(false);
                Ext.getCmp(prototype.id + '-gridReport2').setVisible(false);
                Ext.getCmp(prototype.id + '-gridReport').setVisible(false);
                // graficos.hide();
                break;
        }

    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbDateAfterRender: function (obj) {
        var fecha = new Date();
        obj.setValue(fecha.getFullYear());
    },
    onCmbMonthAfterRender: function (obj) {
        var fecha = new Date();
        fecha = fecha.getMonth() + 1;
        if (fecha <= 9) {
            fecha = 0 + '' + fecha.toString();
        } else {
            fecha = fecha.toString();
        }
        ;
        obj.setValue(win.getAbreviaturaMes(fecha));
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridReport');
        var grid02 = Ext.getCmp(prototype.id + '-gridReport2');
        var grid03 = Ext.getCmp(prototype.id + '-gridReport3');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportGeneral/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        grid01.setStore(store01);

        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportGeneral/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        grid02.setStore(store02);

        var store03 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportGeneral/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        grid03.setStore(store03);
        /******* para report ******/
        var grid04 = Ext.getCmp(prototype.id + '-gridAdmreport');

        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid04',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportADM/',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        grid04.setStore(store04);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store04);



    },
    onSearchkey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    imgSearch_clickHandler: function (obj, e) {

        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var ComboTy = Ext.getCmp(prototype.id + '-type').getValue();
        var txtFilterDateFrom2 = Ext.getCmp(prototype.id + '-txtFilterDateFrom2').getRawValue();
        var txtFilterDateTo2 = Ext.getCmp(prototype.id + '-txtFilterDateTo2').getRawValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var CombSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea').getValue();
        var CmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin').getValue();

        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();



        if (ComboBy === '') {
            global.Msg({msg: 'SELECT Of By'});
            return;
        }
        if (txtFilterDateFrom2 === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date From", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (txtFilterDateTo2 === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date To", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }


        if (txtFilterDateFrom2 !== '' && txtFilterDateTo2 !== '') {

            if (global.existeFecha(txtFilterDateFrom2) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom2), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom2').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtFilterDateTo2) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo2), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo2').focus();", 100);
                });
                return;
            }
            if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom2').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo2').getValue())) {
                Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo2').focus();", 100);
                });
                return;
            }
        }

        this.beanGeneral.VP_TYPE = '';
        //primera combinacion
        if (txtcountry !== '' && txtIATA === '' && CombSource === '' && CmbArea === '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '1';
        }
        if (txtcountry !== '' && txtIATA !== '' && CombSource === '' && CmbArea === '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '2';
        }
        if (txtcountry !== '' && txtIATA !== '' && CombSource !== '' && CmbArea === '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '3';
        }
        if (txtcountry !== '' && txtIATA !== '' && CombSource !== '' && CmbArea !== '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '4';
        }
        if (txtcountry !== '' && txtIATA !== '' && CombSource !== '' && CmbArea !== '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '5';
        }
        if (txtcountry !== '' && txtIATA !== '' && CombSource === '' && CmbArea !== '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '6';
        }
        if (txtcountry !== '' && txtIATA === '' && CombSource !== '' && CmbArea === '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '7';
        }
        if (txtcountry !== '' && txtIATA === '' && CombSource !== '' && CmbArea !== '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '8';
        }
        if (txtcountry !== '' && txtIATA === '' && CombSource !== '' && CmbArea !== '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '9';
        }
        if (txtcountry !== '' && txtIATA === '' && CombSource === '' && CmbArea !== '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '10';
        }
        if (txtcountry !== '' && txtIATA === '' && CombSource === '' && CmbArea !== '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '11';
        }
        if (txtcountry === '' && txtIATA !== '' && CombSource === '' && CmbArea !== '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '12';
        }
        if (txtcountry === '' && txtIATA !== '' && CombSource !== '' && CmbArea !== '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '13';
        }
        if (txtcountry === '' && txtIATA !== '' && CombSource !== '' && CmbArea !== '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '14';
        }
        if (txtcountry === '' && txtIATA === '' && CombSource !== '' && CmbArea === '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '15';
        }
        if (txtcountry === '' && txtIATA === '' && CombSource !== '' && CmbArea !== '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '16';
        }
        if (txtcountry === '' && txtIATA === '' && CombSource !== '' && CmbArea !== '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '17';
        }
        if (txtcountry === '' && txtIATA === '' && CombSource !== '' && CmbArea === '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '18';
        }
        if (txtcountry === '' && txtIATA === '' && CombSource === '' && CmbArea !== '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '19';
        }
        if (txtcountry === '' && txtIATA === '' && CombSource === '' && CmbArea !== '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '20';
        }
        if (txtcountry === '' && txtIATA !== '' && CombSource === '' && CmbArea !== '' && CmbOrigin === '') {
            this.beanGeneral.VP_TYPE = '21';
        }
        if (txtcountry === '' && txtIATA === '' && CombSource === '' && CmbArea === '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '22';
        }
        if (txtcountry !== '' && txtIATA === '' && CombSource === '' && CmbArea === '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '23';
        }
        if (txtcountry === '' && txtIATA !== '' && CombSource === '' && CmbArea === '' && CmbOrigin !== '') {
            this.beanGeneral.VP_TYPE = '24';
        }
        if (Ext.getCmp(prototype.id + '-type').getValue() !== '1') {
            this.beanGeneral.STATUS = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
            this.beanGeneral.TRNCU = Ext.getCmp(prototype.id + '-CmbProcess').getValue();
            if (Ext.getCmp(prototype.id + '-type').getValue() === '2') {
                this.beanGeneral.VP_RAZON = Ext.getCmp(prototype.id + '-CmbReason').getValue();
                this.beanGeneral.VP_TYPERAZON = '';
            } else {
                this.beanGeneral.VP_RAZON = '';
                this.beanGeneral.VP_TYPERAZON = Ext.getCmp(prototype.id + '-CmbTypeReason').getValue();
            }



        } else {
            this.beanGeneral.STATUS = '';
            this.beanGeneral.TRNCU = '';
            this.beanGeneral.VP_RAZON = '';
            this.beanGeneral.VP_TYPERAZON = '';

        }

        this.beanGeneral.COMBOBY = ComboBy;
        this.beanGeneral.OPCIONTYPE = ComboTy;
        this.beanGeneral.DATEFROM = txtFilterDateFrom2;
        this.beanGeneral.DATETO = txtFilterDateTo2;
        this.beanGeneral.COUNTRY = txtcountry;
        this.beanGeneral.IN_IATA = txtIATA;
        this.beanGeneral.COMBOCHANNEL = CombSource;
        this.beanGeneral.VP_AREA = CmbArea;
        this.beanGeneral.BASE = CmbOrigin;
        this.SearchReportStatisGeneral(this.beanGeneral, obj === true ? obj : false);
    },
    SearchReportStatisGeneral: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-gridReport').getStore().removeAll();
            if (bean.OPCIONTYPE === '1') {
                if (bean.VP_AREA !== '') {
                    Ext.getCmp(prototype.id + '-gridReport').columns[1].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport').columns[1].setVisible(false);
                }
                if (bean.COUNTRY !== '') {
                    Ext.getCmp(prototype.id + '-gridReport').columns[3].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport').columns[3].setVisible(false);
                }
                if (bean.IN_IATA !== '') {
                    Ext.getCmp(prototype.id + '-gridReport').columns[22].setVisible(true);
                    Ext.getCmp(prototype.id + '-gridReport').columns[23].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport').columns[22].setVisible(false);
                    Ext.getCmp(prototype.id + '-gridReport').columns[23].setVisible(false);
                }
                Ext.getCmp(prototype.id + '-gridReport').getStore().loadPage(1, {
                    params: {
                        beanString: JSON.stringify(bean)
                                //beanString: bean

                    }, callback: function (records, operation, success) {
                        var Objtemp = records;
                        Ext.getCmp(prototype.id + '-chart').removeAll();
                        Ext.getCmp(prototype.id + '-chart2').removeAll();
                        if (Objtemp.length > 0) {
                            if (bean.OPCIONTYPE === '2') {
                                me.onCreateChart(Objtemp);
                            }
                        } else {
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});
                        }

                    }
                });
            } else if (bean.OPCIONTYPE === '2') {
                if (bean.VP_AREA !== '') {
                    Ext.getCmp(prototype.id + '-gridReport2').columns[2].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport2').columns[2].setVisible(false);
                }
                if (bean.COUNTRY !== '') {
                    Ext.getCmp(prototype.id + '-gridReport2').columns[4].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport2').columns[4].setVisible(false);
                }
                if (bean.IN_IATA !== '') {
                    Ext.getCmp(prototype.id + '-gridReport2').columns[23].setVisible(true);
                    Ext.getCmp(prototype.id + '-gridReport2').columns[24].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport2').columns[23].setVisible(false);
                    Ext.getCmp(prototype.id + '-gridReport2').columns[24].setVisible(false);
                }
                if (bean.BASE !== '') {
                    Ext.getCmp(prototype.id + '-gridReport2').columns[3].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport2').columns[3].setVisible(false);
                }


                Ext.getCmp(prototype.id + '-gridReport2').getStore().loadPage(1, {
                    params: {
                        beanString: JSON.stringify(bean)
                                //beanString: bean

                    }, callback: function (records, operation, success) {
                        var Objtemp = records;
                        Ext.getCmp(prototype.id + '-chart').removeAll();
                        Ext.getCmp(prototype.id + '-chart2').removeAll();
                        if (Objtemp.length > 0) {
                            if (bean.OPCIONTYPE === '2') {
                                me.onCreateChart(Objtemp);
                            }
                        } else {
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});
                        }

                    }
                });
            } else if (bean.OPCIONTYPE === '3') {
                if (bean.VP_AREA !== '') {
                    Ext.getCmp(prototype.id + '-gridReport3').columns[2].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport3').columns[2].setVisible(false);
                }
                if (bean.COUNTRY !== '') {
                    Ext.getCmp(prototype.id + '-gridReport3').columns[4].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport3').columns[4].setVisible(false);
                }
                if (bean.IN_IATA !== '') {
                    Ext.getCmp(prototype.id + '-gridReport3').columns[19].setVisible(true);
                    Ext.getCmp(prototype.id + '-gridReport3').columns[20].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport3').columns[19].setVisible(false);
                    Ext.getCmp(prototype.id + '-gridReport3').columns[20].setVisible(false);
                }
                if (bean.BASE !== '') {
                    Ext.getCmp(prototype.id + '-gridReport3').columns[3].setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-gridReport3').columns[3].setVisible(false);
                }


                Ext.getCmp(prototype.id + '-gridReport3').getStore().loadPage(1, {
                    params: {
                        beanString: JSON.stringify(bean)
                                //beanString: bean

                    }, callback: function (records, operation, success) {
                        var Objtemp = records;
                        Ext.getCmp(prototype.id + '-chart').removeAll();
                        Ext.getCmp(prototype.id + '-chart2').removeAll();
                        if (Objtemp.length > 0) {
                            if (bean.OPCIONTYPE === '2') {
                                me.onCreateChart(Objtemp);
                            }
                        } else {
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});
                        }

                    }
                });
            }
        }

    },
    OnAmountInteger: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000');
    },
    onColumnIntegerRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000');
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnColumnApplicationRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_detalle: function (rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var ComboTy = Ext.getCmp(prototype.id + '-type').getValue();
        var txtFilterDateFrom2 = Ext.getCmp(prototype.id + '-txtFilterDateFrom2').getRawValue();
        var txtFilterDateTo2 = Ext.getCmp(prototype.id + '-txtFilterDateTo2').getRawValue();
        var grid;
        if (ComboTy === '') {
            Ext.MessageBox.alert('PRAXIS', "Select of by Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-type').focus();", 100);
            });
            return;
        }

        Ext.getCmp(prototype.id + '-pripagination').setVisible(true);
        Ext.getCmp(prototype.id + '-panelPrinPagi').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-txt').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(true);
        var graficos = Ext.getCmp(prototype.id + '-graficos');
        graficos.tab.hide();
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(false);
        //
        Ext.getCmp(prototype.id + '-search-type').setVisible(false);
        Ext.getCmp(prototype.id + '-type').setVisible(false);
        Ext.getCmp(prototype.id + '-txtFilterDateFrom2').setVisible(false);
        Ext.getCmp(prototype.id + '-txtFilterDateTo2').setVisible(false);

        Ext.getCmp(prototype.id + '-btn-search').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-search2').setVisible(true);

        if (ComboTy === '1') {
            grid = Ext.getCmp(prototype.id + '-gridReport');
            Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(true);
            Ext.getCmp(prototype.id + '-gridReport').setVisible(false);
        }
        if (ComboTy === '2') {
            grid = Ext.getCmp(prototype.id + '-gridReport2');
            Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(true);
            Ext.getCmp(prototype.id + '-gridReport2').setVisible(false);
            var graficos = Ext.getCmp(prototype.id + '-graficos');
            graficos.tab.show();
            Ext.getCmp(prototype.id + '-tabpanelPrincipal').setActiveTab(0);
        }
        if (ComboTy === '3') {
            grid = Ext.getCmp(prototype.id + '-gridReport3');
            Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(true);
            Ext.getCmp(prototype.id + '-gridReport3').setVisible(false);
        }

        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        this.beanAdmReport.OPCIONTYPE = ComboBy;
        this.beanAdmReport.COMBOBY = ComboTy;
        //this.beanAdmReport.DATEFROM = txtFilterDateFrom2;
        //this.beanAdmReport.DATETO = txtFilterDateTo2;
        this.beanAdmReport.DATEFROM = rec.data.A2548FREGI.substr(0, 4) + "" + win.getMonthAbbreviation(rec.data.A2548FREGI.substr(4, 3)) + '01';
        this.beanAdmReport.DATETO = rec.data.A2548FREGI.substr(0, 4) + "" + win.getMonthAbbreviation(rec.data.A2548FREGI.substr(4, 3)) + '31';
        this.beanAdmReport.VP_AREA = rec.data.A2548AREA;
        this.beanAdmReport.BASE = rec.data.A2548BASE;
        this.beanAdmReport.TRNCU = rec.data.A2548TRNCU;
        this.beanAdmReport.COUNTRY = rec.data.A2548PAIS;
        this.beanAdmReport.VP_IATA = rec.data.A2548IATA;
        this.beanAdmReport.VP_EROOR = rec.data.A2548DESC2;
        this.beanAdmReport.CHANNEL = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        this.beanAdmReport.VP_RAZON = Ext.getCmp(prototype.id + '-CmbReason').getValue();
        this.beanAdmReport.VP_TYPERAZON = Ext.getCmp(prototype.id + '-CmbTypeReason').getValue();
        this.beanAdmReport.STATUS = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        this.beanAdmReport.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        this.beanAdmReport.IN_USER = '';
        Ext.getCmp(prototype.id + '-gridAdmreport').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridAdmreport').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(this.beanAdmReport)
                        //beanString: bean

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    //Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.A3388TOTALPAG);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }
                //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

            }
        });
        //beanAdmReport
    },
    onBackClick: function (obj, e) {
        var ComboTy = Ext.getCmp(prototype.id + '-type').getValue();
        Ext.getCmp(prototype.id + '-pripagination').setVisible(false);
        Ext.getCmp(prototype.id + '-panelPrinPagi').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-txt').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
        var graficos = Ext.getCmp(prototype.id + '-graficos');
        graficos.tab.hide();
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(true);
        //
        Ext.getCmp(prototype.id + '-search-type').setVisible(true);
        Ext.getCmp(prototype.id + '-type').setVisible(true);
        Ext.getCmp(prototype.id + '-txtFilterDateFrom2').setVisible(true);
        Ext.getCmp(prototype.id + '-txtFilterDateTo2').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-search').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-search2').setVisible(false);

        if (ComboTy === '1') {
            Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(false);
            Ext.getCmp(prototype.id + '-gridReport').setVisible(true);
        }
        if (ComboTy === '2') {
            Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(false);
            Ext.getCmp(prototype.id + '-gridReport2').setVisible(true);
            var graficos = Ext.getCmp(prototype.id + '-graficos');
            graficos.tab.show();
            Ext.getCmp(prototype.id + '-tabpanelPrincipal').setActiveTab(0);
        }
        if (ComboTy === '3') {
            Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(false);
            Ext.getCmp(prototype.id + '-gridReport3').setVisible(true);
        }
    },
    exportExcel: function (_path) {
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
    onExcelClick: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
        }
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var store = obj.getStore();
        var totRow = store.getCount() !== 0 ? store.totalCount : 0;
        obj.store.proxy.extraParams = {
            beanString: JSON.stringify(this.beanAdmReport),
            totRow: totRow
        };
    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('SNCAMBIO', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'SNCAMBIO' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.screens.ScrFormUnico({
            params: {
                action: action,
                VP_PREME: rec.get('A2548PREME'),
                //rec: rec,
                url01: prototype.url03
            }
        });
        win.show();
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A2548FLAG'))) {
            case 'A':
                color = '#F5A9F2';
                value = 'Approved';
                break;
            case 'U':
                color = '#D8D8D8';
                value = 'Cleared Up';
                break;
            case 'X':
                color = '#FF0000';
                value = 'Void';
                break;
            case 'C':
                color = '#F2F5A9';
                value = 'Condoned';
                break;
            case 'P':
                color = '#81F7BE';
                value = 'Billed';
                break;
            case 'I':
                color = '#BEF781';
                value = 'Billed GDS';
                break;
            case 'F':
                color = '#4DEC8E';
                value = 'Accredited';
                break;
            case 'Z':
                color = '#F8D169';
                value = 'Authorized';
                break;
            case 'R':
                color = '#F2A60D';
                value = 'Reaudited';
                break;
            case 'J':
                color = '#E3DAED';
                value = 'Justified';
                break;
            case 'D':
                color = '#FF9966';
                value = 'Disputed';
                break;
            case 'E':
                color = '#F78181';
                value = 'Rejecte disputed';
                break;
            case 'W':
                color = '#F3EFB6';
                value = 'Approve disputed';
                break;
            case 'B':
                color = '#AAE3E8';
                value = 'Acm\Adm na BSPlink\MM';
                break;
            case 'Y':
                color = '#EFE41B';
                value = 'Pending';
                break;
            case 'N':
                color = '#E5B2B2';
                value = 'Rejected';
                break;
            case 'O':
                color = '#B791EF';
                value = 'IATA disabled';
                break;
            case 'Q':
                color = '#DC7633';
                value = 'Unregistered client';
                break;
            case 'L':
                color = '#FB63A2';
                value = 'Acm BSPlink/MM';
                break;

            case 'G':
                color = '#F3F781';
                value = 'PBD issued';
                break;
            case 'H':
                color = '#FE9A2E';
                value = 'Agreement not reached - to agent';
                break;
            case 'T':
                color = '#F781D8';
                value = 'Agree with airline';
                break;
            case 'K':
                color = '#A9F5BC';
                value = 'Agree with Agent';
                break;
                //{"code": "G", "name": "POST BILLING"},
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnBase: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A2548BASE'))) {
            case 'PR':
                value = 'Proceso Regular';
                break;
            case 'UP':
                value = 'UpFront';
                break;
            case 'BF':
                value = 'Backend Flown';
                break;
            case 'BS':
                value = 'Backend Sale';
                break;
            case 'MS':
                value = 'Massive';
                break;
            case 'QR':
                value = 'Querys';
                break;
            case 'PR':
                value = 'Automatic';
                break;
            case 'MA':
                value = 'Manual';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    searchform_detalle_fin: function () {
        var me = this;
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var ComboTy = Ext.getCmp(prototype.id + '-type').getValue();
        var txtFilterDateFrom2 = Ext.getCmp(prototype.id + '-txtFilterDateFrom2').getRawValue();
        var txtFilterDateTo2 = Ext.getCmp(prototype.id + '-txtFilterDateTo2').getRawValue();
        if (ComboTy === '') {
            Ext.MessageBox.alert('PRAXIS', "Select of by Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-type').focus();", 100);
            });
            return;
        }

        Ext.getCmp(prototype.id + '-pripagination').setVisible(true);
        Ext.getCmp(prototype.id + '-panelPrinPagi').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-txt').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(false);
        var graficos = Ext.getCmp(prototype.id + '-graficos');
        graficos.tab.hide();
        //
        Ext.getCmp(prototype.id + '-search-type').setVisible(false);
        Ext.getCmp(prototype.id + '-type').setVisible(false);
        Ext.getCmp(prototype.id + '-txtFilterDateFrom2').setVisible(false);
        Ext.getCmp(prototype.id + '-txtFilterDateTo2').setVisible(false);

        if (ComboTy === '1') {
            grid = Ext.getCmp(prototype.id + '-gridReport');
            Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(true);
            Ext.getCmp(prototype.id + '-gridReport').setVisible(false);
        }
        if (ComboTy === '2') {
            grid = Ext.getCmp(prototype.id + '-gridReport2');
            Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(true);
            Ext.getCmp(prototype.id + '-gridReport2').setVisible(false);
            var graficos = Ext.getCmp(prototype.id + '-graficos');
            graficos.tab.show();
            Ext.getCmp(prototype.id + '-tabpanelPrincipal').setActiveTab(0);
        }
        if (ComboTy === '3') {
            grid = Ext.getCmp(prototype.id + '-gridReport3');
            Ext.getCmp(prototype.id + '-gridAdmreport').setVisible(true);
            Ext.getCmp(prototype.id + '-gridReport3').setVisible(false);
        }

        me.beanAdmSearch.OPCIONTYPE = me.beanAdmReport.OPCIONTYPE;
        me.beanAdmSearch.COMBOBY = me.beanAdmReport.ComboTy;
        me.beanAdmSearch.DATEFROM = me.beanAdmReport.DATEFROM;
        me.beanAdmSearch.DATETO = me.beanAdmReport.DATETO;
        me.beanAdmSearch.VP_AREA = Ext.getCmp(prototype.id + '-CmbArea').getValue();
        me.beanAdmSearch.BASE = Ext.getCmp(prototype.id + '-CmbOrigin').getValue();
        me.beanAdmSearch.TRNCU = me.beanAdmReport.TRNCU;
        me.beanAdmSearch.COUNTRY = Ext.getCmp(prototype.id + '-country').getValue();
        me.beanAdmSearch.VP_IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        me.beanAdmSearch.VP_EROOR = me.beanAdmReport.VP_EROOR;
        me.beanAdmSearch.CHANNEL = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        me.beanAdmSearch.VP_RAZON = Ext.getCmp(prototype.id + '-CmbReason').getValue();
        me.beanAdmSearch.VP_TYPERAZON = Ext.getCmp(prototype.id + '-CmbTypeReason').getValue();
        me.beanAdmSearch.STATUS = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        me.beanAdmSearch.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        me.beanAdmSearch.IN_USER = '';
        Ext.getCmp(prototype.id + '-gridAdmreport').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridAdmreport').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(me.beanAdmSearch)
                        //beanString: bean

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    //Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.A3388TOTALPAG);
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }
                //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

            }
        });
    },
    onCreateChart: function (Objtemp) {
        var txtFilterDateFrom2 = Ext.getCmp(prototype.id + '-txtFilterDateFrom2').getRawValue();
        var txtFilterDateTo2 = Ext.getCmp(prototype.id + '-txtFilterDateTo2').getRawValue();
        var panel1 = Ext.getCmp(prototype.id + '-chart');
        var panel2 = Ext.getCmp(prototype.id + '-chart2');

        var arraySearchMonth = [];
        var arrayDataMonth = [];
        var arrayDataGraMonth = [];
        for (var i = 0; i < Objtemp.length; ++i) {
            if (arraySearchMonth.indexOf(String(Objtemp[i].data.A2548FLAG)) < 0) {
                arraySearchMonth.push(String(Objtemp[i].data.A2548FLAG));
                arrayDataMonth.push({
                    A2548FLAG: String(Objtemp[i].data.A2548FLAG),
                    children: [{CANTBSP: Objtemp[i].data.A2548CATNNTD, CANTARC: Objtemp[i].data.A2548CATNNTC, CANTASR: Objtemp[i].data.A2548CATNFAC}]

                });
            } else {
                arrayDataMonth[arraySearchMonth.indexOf(String(Objtemp[i].data.A2548FLAG))].children.push({CANTBSP: Objtemp[i].data.A2548CATNNTD, CANTARC: Objtemp[i].data.A2548CATNNTC, CANTASR: Objtemp[i].data.A2548CATNFAC});
            }
        }

        var vl_CANTBSP = 0;
        var vl_CANTARC = 0;
        var vl_CANTASR = 0;
        for (var i = 0; i < arrayDataMonth.length; ++i) {
            vl_CANTBSP = 0;
            vl_CANTARC = 0;
            vl_CANTASR = 0;
            for (var vi = 0; vi < arrayDataMonth[i].children.length; ++vi) {
                vl_CANTBSP += parseFloat(arrayDataMonth[i].children[vi].CANTBSP);
                vl_CANTARC += parseFloat(arrayDataMonth[i].children[vi].CANTARC);
                vl_CANTASR += parseFloat(arrayDataMonth[i].children[vi].CANTASR);
            }
            arrayDataGraMonth.push({anio: arrayDataMonth[i].A2548FLAG, CANTBSP: vl_CANTBSP, CANTARC: vl_CANTARC, CANTASR: vl_CANTASR});

        }
        var storeMonth = Ext.create('Ext.data.Store', {
            fields: ['anio', 'CANTBSP', 'CANTARC', 'CANTASR'],
            data: arrayDataGraMonth

        });

        var chart01 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosmonthDe',
            items: [
                {
                    xtype: 'cartesian',
                    width: 1400,
                    height: 350,
                    insetPadding: '10 40 0 10',
                    autoScroll: true,
                    captions: {
                        title: {
                            text: 'Status ADMs By Processing Date ' + txtFilterDateFrom2 + " To " + txtFilterDateTo2,
                            alignTo: 'chart'
                        },
                        subtitle: {
                            alignTo: 'chart'
                        }
                    },
                    //theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: storeMonth,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['CANTBSP', 'CANTARC', 'CANTASR'],
                            grid: true
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            label: {
                                rotate: {
                                    degrees: -45
                                }
                            }
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['ARC', 'ASR', 'BSP'],
                        xField: 'anio',
                        yField: ['CANTBSP', 'CANTARC', 'CANTASR'],

                        label: {
                            field: ['CANTBSP', 'CANTARC', 'CANTASR'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm'
                        },
                        highlight: true,
                        style: {
                            inGroupGapWidth: -7
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: 'onTooltip3Render'
                        }
                    }
                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel1.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: 'Status ADMs By Processing Date ' + txtFilterDateFrom2 + " To " + txtFilterDateTo2
                        });
                    }
                }
            ]
        });
        panel1.add(chart01);

        // segunda grafica
        var arraySearchMonth2 = [];
        var arrayDataMonth2 = [];
        var arrayDataGraMonth2 = [];
        for (var i = 0; i < Objtemp.length; ++i) {
            if (arraySearchMonth2.indexOf(String(Objtemp[i].data.A2548FLAG)) < 0) {
                arraySearchMonth2.push(String(Objtemp[i].data.A2548FLAG));
                arrayDataMonth2.push({
                    A2548FLAG: String(Objtemp[i].data.A2548FLAG),
                    children: [{CANTBSP: Objtemp[i].data.CANTBSPACM, CANTARC: Objtemp[i].data.CANTARCACM, CANTASR: Objtemp[i].data.CANTASRACM}]

                });
            } else {
                arrayDataMonth2[arraySearchMonth2.indexOf(String(Objtemp[i].data.A2548FLAG))].children.push({CANTBSP: Objtemp[i].data.CANTBSPACM, CANTARC: Objtemp[i].data.CANTARCACM, CANTASR: Objtemp[i].data.CANTASRACM});
            }
        }

        var vl_CANTBSP = 0;
        var vl_CANTARC = 0;
        var vl_CANTASR = 0;
        for (var i = 0; i < arrayDataMonth2.length; ++i) {
            vl_CANTBSP = 0;
            vl_CANTARC = 0;
            vl_CANTASR = 0;
            for (var vi = 0; vi < arrayDataMonth2[i].children.length; ++vi) {
                vl_CANTBSP += parseFloat(arrayDataMonth2[i].children[vi].CANTBSP);
                vl_CANTARC += parseFloat(arrayDataMonth2[i].children[vi].CANTARC);
                vl_CANTASR += parseFloat(arrayDataMonth2[i].children[vi].CANTASR);
            }
            arrayDataGraMonth2.push({anio: arrayDataMonth2[i].A2548FLAG, CANTBSP: vl_CANTBSP, CANTARC: vl_CANTARC, CANTASR: vl_CANTASR});

        }
        var storeMonth2 = Ext.create('Ext.data.Store', {
            fields: ['anio', 'CANTBSP', 'CANTARC', 'CANTASR'],
            data: arrayDataGraMonth2

        });

        var chart02 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosmonthDe2',
            items: [
                {
                    xtype: 'cartesian',
                    width: 1400,
                    height: 350,
                    insetPadding: '10 40 0 10',
                    autoScroll: true,
                    captions: {
                        title: {
                            text: 'Status ACMs By Processing Date ' + txtFilterDateFrom2 + " To " + txtFilterDateTo2,
                            alignTo: 'chart'
                        },
                        subtitle: {
                            alignTo: 'chart'
                        }
                    },
                    //theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: storeMonth2,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['CANTBSP', 'CANTARC', 'CANTASR'],
                            grid: true
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            label: {
                                rotate: {
                                    degrees: -45
                                }
                            }
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['ARC', 'ASR', 'BSP'],
                        xField: 'anio',
                        yField: ['CANTBSP', 'CANTARC', 'CANTASR'],

                        label: {
                            field: ['CANTBSP', 'CANTARC', 'CANTASR'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm'
                        },
                        highlight: true,
                        style: {
                            inGroupGapWidth: -7
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: 'onTooltip3Render'
                        }
                    }
                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel2.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: 'Status ACMs By Processing Date ' + txtFilterDateFrom2 + " To " + txtFilterDateTo2
                        });
                    }
                }
            ]
        });
        panel2.add(chart02);
    },
    onSeriesLabelRenderm_Porce: function (value, record, item) {
        //console.log(record)    
        return Ext.util.Format.number(value, '0,000'); //+ ' (' + Ext.util.Format.number((value / me.totalPoce) * 100, '0.00') + ') %';

    },
    onTooltip3Render: function (tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    }

});

