
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkReportsStatisticsdet.BsplinkReportsStatisticsdetController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BsplinkReportsStatisticsdetController',
    bean: {},
    beanTMP: {},
    beanUpdate: {},
    totalUsers: 0,
    totalcountry: 0,
    TotalDia: 0,
    TOTALRFNDFOPREASON2: 0,
    TOTALRFNDFOPREASON3: 0,
    TOTALRFNDFOPREASON:0,
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;

    },
    OnBeforeShow: function () {

        prototype.id = 'BsplinkReportsStatisticsdet';
        prototype.url = CONTEXTPATH + '/BsplinkReportsStatisticsdet';
        prototype.url01 = CONTEXTPATH + '/BsplinkRefundQueryRFND';
        prototype.url02 = CONTEXTPATH + '/BwrBSPLINKRFND';
        prototype.id01 = 'DataEntryBsplinkRefundQueryRFND';
        prototype.id02 = 'FormOfPaymentRFND';
        prototype.id03 = 'OriginalDataTaxesRFND';
        prototype.id04 = 'FormRazonesRFND';
        prototype.id05 = 'BsplinkFileViewer';

        prototype.id = 'BsplinkReportsStatisticsdet';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;


    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresFilters();
        this.onLoadUsers();
        this.setStoresGrids();

        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var cmbPayment = Ext.getCmp(prototype.id + '-CmbPayment');
        var cmbTypeRFND = Ext.getCmp(prototype.id + '-CmbTypeRFND');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                //{ "code": "5", "name": "AGENCY"},
                {"code": "1", "name": "APPLICATION DATE"},
                {"code": "2", "name": "AUTHORISED - REJECTED / DATE"}/*,
                 { "code": "2", "name": "DOCUMENT"},
                 { "code": "1", "name": "SYSTEM DATE"},
                 { "code": "3", "name": "TICKET" }*/
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "F", "name": "AUTHORISED"},
                {"code": "Y", "name": "PENDING"},
                {"code": "R", "name": "REJECTED"}
            ]
        }));

        cmbPayment.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "CA", "name": "Cash"},
                {"code": "CC", "name": "Credit card"}
            ]
        }));

        cmbTypeRFND.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "TOTAL", "name": "TOTAL"},
                {"code": "PARTIAL", "name": "PARTIAL"}
            ]
        }));


    },
    onLoadUsers: function () {
        var cmbUser = Ext.getCmp(prototype.id + '-txtUser');
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url01 + '/loadDataInit',
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
                    cmbUser.setValue('ALL');
                }
            }
        });
        cmbUser.setStore(store);
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportGeneral',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbStatusChange: function (obj, newValue, oldValue, eOpts) {

    },
    onSearchkey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.onSearchClick();
        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
            //   Ext.getCmp(prototype.id + '-pagginator-legend').hide();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
            // Ext.getCmp(prototype.id + '-pagginator-legend').show();
        }
    },
    onSearchClick: function (obj, e) {
        var me = this;

        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());
        var txtFilterDateFrom = String(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue());
        var txtFilterDateTo = String(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue());
        var txtFrmaSerie = String(Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue());
        var txtIATA = String(Ext.getCmp(prototype.id + '-txtIATA').getValue());
        var txtNumber = String(Ext.getCmp(prototype.id + '-txtNumber').getValue());
        var cmbStatus = String(Ext.getCmp(prototype.id + '-CmbStatus').getValue());
        var txtCountry = String(Ext.getCmp(prototype.id + '-txtCountry').getValue());
        var cmbPayment = String(Ext.getCmp(prototype.id + '-CmbPayment').getValue());
        var cmbTypeRFND = String(Ext.getCmp(prototype.id + '-CmbTypeRFND').getValue());
        var cmbUser = String(Ext.getCmp(prototype.id + '-txtUser').getValue());

        if (cmbUser === 'ALL') {
            cmbUser = '';
        }
        if (comboBy === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'SELECT Of By');
            return;
        }
        if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                return;
            }
        }
        if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                return;
            }
        }

        if (global.existeFecha(txtFilterDateFrom) !== '') {
            Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (global.existeFecha(txtFilterDateTo) !== '') {
            Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }
        /*if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '' &&
                Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
            if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
                    Ext.Msg.alert('.: PRAXIS :.', 'the starting date must be less than the end date');
                    return;
                }
        }*/


        this.bean.IN_OPTION = comboBy;
        this.bean.IN_DATEFROM = txtFilterDateFrom;
        this.bean.IN_DATETO = txtFilterDateTo;
        this.bean.IN_SERIE = txtFrmaSerie;
        this.bean.IN_IATA = txtIATA;
        this.bean.IN_DOCUMET = txtNumber;
        this.bean.IN_STATUS = cmbStatus;
        this.bean.IN_COUNTRY = txtCountry;
        this.bean.IN_SEQ = cmbPayment;
        this.bean.IN_A3389PENDING = cmbTypeRFND;
        this.bean.IN_A3389REGAS = cmbUser;
        this.bean.IN_A3389IATA = '';
        this.bean.IN_A3389REJECT = '';

        this.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        this.SearchReportRFND(this.bean, obj === true ? obj : false);
    },
    SearchReportRFND: function (bean, bExcel) {
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            var grid = Ext.getCmp(prototype.id + '-grid');
            var store = grid.getStore();
            store.removeAll();
            Ext.getCmp(prototype.id + '-grid').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)
                            //beanString: bean

                }, callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        me.onclickshow(bean);
                    } else {
                        //Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
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
    onCreateGeneralChar: function (datastadFauto) {
        Ext.getCmp(prototype.id + '-chart6').removeAll();
        var panel5 = Ext.getCmp(prototype.id + '-chart6');
        Ext.getCmp(prototype.id + '-chart7').removeAll();
        var panel6 = Ext.getCmp(prototype.id + '-chart7');
        var arraychart4 = [];
        var arrayDatachart4 = [];
        var arrayDataGrachart4 = [];
        var arrayDataGrachartTotal = [];
        for (var i = 0; i < datastadFauto.length; ++i) {
            if (arraychart4.indexOf(String(datastadFauto[i].A3389FAUTO)) < 0) {
                arraychart4.push(String(datastadFauto[i].A3389FAUTO));
                arrayDatachart4.push({
                    A3389FAUTO: String(datastadFauto[i].A3389FAUTO),
                    children: [{A3389FLAG: datastadFauto[i].A3389FLAG, A3389STATO: datastadFauto[i].A3389STATO, A3389STATU: datastadFauto[i].A3389STATU}]

                });
            } else {
                arrayDatachart4[arraychart4.indexOf(String(datastadFauto[i].A3389FAUTO))].children.push({A3389FLAG: datastadFauto[i].A3389FLAG, A3389STATO: datastadFauto[i].A3389STATO, A3389STATU: datastadFauto[i].A3389STATU});
            }
        }

        /*total por dia*/
        var A3389totalDia = 0;
         this.TotalDia =0;
        for (var i = 0; i < arrayDatachart4.length; ++i) {
            A3389totalDia = 0;
            for (var vi = 0; vi < arrayDatachart4[i].children.length; ++vi) {
                A3389totalDia += parseFloat(arrayDatachart4[i].children[vi].A3389FLAG) + parseFloat(arrayDatachart4[i].children[vi].A3389STATO) + parseFloat(arrayDatachart4[i].children[vi].A3389STATU);
                this.TotalDia += A3389totalDia;
            }
            arrayDataGrachartTotal.push({country: arrayDatachart4[i].A3389FAUTO, total: A3389totalDia});
        }
        var store1TotalDia = Ext.create('Ext.data.Store', {
            fields: ['country', 'total'],
            data: arrayDataGrachartTotal
        });
        var chart05 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosTotalDia',
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 400,
                    reference: 'chart',
                    captions: {
                        title: 'Total refund requests per day'

                    },
                    theme: {
                        type: 'blue'
                    },
                    store: store1TotalDia,
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: 'total',
                            //maximum: 4000,
                            majorTickSteps: 10,
                            label: {
                                textAlign: 'right'
                            },
                            renderer: 'onAxisLabelRender',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                                },
                                even: {
                                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            label: {
                                rotate: {
                                    degrees: -60
                                }
                            }
                            //grid: true
                            /* label: {
                             textAlign: 'end',
                             rotation: {
                             degrees: - 15
                             }
                             }*/
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'total',
                            style: {
                                minGapWidth: 20
                            },
                            highlightCfg: {
                                saturationFactor: 1.5
                            },
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender_Porce3'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltipRenderporce3'
                            }
                        }]
                }],
            listeners: {
                afterrender: function (obj) {
                    panel5.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Total refund requests per day"
                        });
                    }
                }
            ]
        });
        panel5.add(chart05);
        /*fin del total por dia*/

        var A3389FLAG = 0;
        var A3389STATO = 0;
        var A3389STATU = 0;
        for (var i = 0; i < arrayDatachart4.length; ++i) {
            A3389FLAG = 0;
            A3389STATO = 0;
            A3389STATU = 0;
            for (var vi = 0; vi < arrayDatachart4[i].children.length; ++vi) {
                A3389FLAG += parseFloat(arrayDatachart4[i].children[vi].A3389FLAG);
                A3389STATO += parseFloat(arrayDatachart4[i].children[vi].A3389STATO);
                A3389STATU += parseFloat(arrayDatachart4[i].children[vi].A3389STATU);
            }
            arrayDataGrachart4.push({country: arrayDatachart4[i].A3389FAUTO, AUTHORISED: A3389FLAG, REJECTED: A3389STATO, PENDING: A3389STATU});
        }

        var store6 = Ext.create('Ext.data.Store', {
            fields: ['country', 'AUTHORISED', 'REJECTED', 'PENDING'],
            data: arrayDataGrachart4
        });
        var chart6 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosDataGrachart4',
            items: [
                {
                    xtype: 'cartesian',
                    width: '1340',
                    height: 400,
                    captions: {
                        title: {
                            text: 'Detail refund requests per day',
                            alignTo: 'chart'
                        },
                        subtitle: {
                            // text: 'Quarter-wise comparison',
                            alignTo: 'chart'
                        }
                    },
                    theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: store6,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['AUTHORISED', 'REJECTED', 'PENDING'],
                            grid: true, //,
                            //title: 'Sales in USD',
                            renderer: 'onAxisLabelRender'
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            label: {
                                rotate: {
                                    degrees: -60
                                }
                            }
                            /*title: {
                             translationX: -30
                             },
                             grid: true*/
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['AUTHORISED', 'REJECTED', 'PENDING'],
                        xField: 'country',
                        yField: ['AUTHORISED', 'REJECTED', 'PENDING'],
                        label: {
                            field: ['AUTHORISED', 'REJECTED', 'PENDING'],
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
                    panel6.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Detail refund requests per day"
                        });
                    }
                }
            ]
        });
        panel6.add(chart6);
    },
    onCreateCOUTRY: function (datastadPais) {
        Ext.getCmp(prototype.id + '-TOTALRFNDCOUTRY').removeAll();
        Ext.getCmp(prototype.id + '-DETALLERFNDCOUTRY').removeAll();
        var panelTotalCoutry = Ext.getCmp(prototype.id + '-TOTALRFNDCOUTRY');
        var panelDetaCoutry = Ext.getCmp(prototype.id + '-DETALLERFNDCOUTRY');

        var arraychart3 = [];
        var arrayDatachart3 = [];
        var arrayDataGrachartCOUTRY = [];
        var arrayDataGrachartCOUTRYTOTAL = [];
        for (var i = 0; i < datastadPais.length; ++i) {
            if (arraychart3.indexOf(String(datastadPais[i].A3389PAIS)) < 0) {
                arraychart3.push(String(datastadPais[i].A3389PAIS));
                arrayDatachart3.push({
                    A3389PAIS: String(datastadPais[i].A3389PAIS),
                    children: [{A3389FLAG: datastadPais[i].A3389FLAG, A3389STATO: datastadPais[i].A3389STATO, A3389STATU: datastadPais[i].A3389STATU}]

                });
            } else {
                arrayDatachart3[arraychart3.indexOf(String(datastadPais[i].A3389PAIS))].children.push({A3389FLAG: datastadPais[i].A3389FLAG, A3389STATO: datastadPais[i].A3389STATO, A3389STATU: datastadPais[i].A3389STATU});
            }
        }
        var A3389TOTALCOUTRY = 0;
        this.totalcountry=0;
        for (var i = 0; i < arrayDatachart3.length; ++i) {
            A3389TOTALCOUTRY = 0;
            for (var vi = 0; vi < arrayDatachart3[i].children.length; ++vi) {
                A3389TOTALCOUTRY += parseFloat(arrayDatachart3[i].children[vi].A3389FLAG) + parseFloat(arrayDatachart3[i].children[vi].A3389STATO) + parseFloat(arrayDatachart3[i].children[vi].A3389STATU);
                this.totalcountry += A3389TOTALCOUTRY;
            }
            arrayDataGrachartCOUTRYTOTAL.push({country: arrayDatachart3[i].A3389PAIS, total: A3389TOTALCOUTRY});
        }
        var storeCOUTRYTOTAL = Ext.create('Ext.data.Store', {
            fields: ['country', 'total'],
            data: arrayDataGrachartCOUTRYTOTAL
        });
        var chartTotalCoutry = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficoscoutrytotal',
            items: [
                {
                    xtype: 'cartesian',
                    width: '1340',
                    height: 400,
                    reference: 'chart',
                    captions: {
                        title: 'Total refund requests by country'

                    },
                    theme: {
                        type: 'blue'
                    },
                    store: storeCOUTRYTOTAL,
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: 'total',
                            //maximum: 4000,
                            majorTickSteps: 10,
                            label: {
                                textAlign: 'right'
                            },
                            renderer: 'onAxisLabelRender',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                                },
                                even: {
                                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'total',
                            style: {
                                minGapWidth: 20
                            },
                            highlightCfg: {
                                saturationFactor: 1.5
                            },
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender_Porce2'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltipRenderporce2'
                            }
                        }]
                }],
            listeners: {
                afterrender: function (obj) {
                    panelTotalCoutry.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Total refund requests by country"
                        });
                    }
                }
            ]
        });
        panelTotalCoutry.add(chartTotalCoutry);
        ///detalle del coutry

        var A3389FLAG = 0;
        var A3389STATO = 0;
        var A3389STATU = 0;
        for (var i = 0; i < arrayDatachart3.length; ++i) {
            A3389FLAG = 0;
            A3389STATO = 0;
            A3389STATU = 0;
            for (var vi = 0; vi < arrayDatachart3[i].children.length; ++vi) {
                A3389FLAG += parseFloat(arrayDatachart3[i].children[vi].A3389FLAG);
                A3389STATO += parseFloat(arrayDatachart3[i].children[vi].A3389STATO);
                A3389STATU += parseFloat(arrayDatachart3[i].children[vi].A3389STATU);
            }
            arrayDataGrachartCOUTRY.push({country: arrayDatachart3[i].A3389PAIS, AUTHORISED: A3389FLAG, REJECTED: A3389STATO, PENDING: A3389STATU});
        }
        var store5 = Ext.create('Ext.data.Store', {
            fields: ['country', 'AUTHORISED', 'REJECTED', 'PENDING'],
            data: arrayDataGrachartCOUTRY
        });

        var chartDetaCoutry = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosDataCoutry',
            items: [
                {
                    xtype: 'cartesian',
                    width: '1340',
                    height: 400,
                    captions: {
                        title: {
                            text: 'Detail refund requests by country',
                            alignTo: 'chart'
                        },
                        subtitle: {
                            // text: 'Quarter-wise comparison',
                            alignTo: 'chart'
                        }
                    },
                    theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: store5,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['AUTHORISED', 'REJECTED', 'PENDING'],
                            grid: true, //,
                            //title: 'Sales in USD',
                            renderer: 'onAxisLabelRender'
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            /* title: {
                             text: 'Years',
                             translationX: - 30
                             },*/
                            grid: true
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['AUTHORISED', 'REJECTED', 'PENDING'],
                        xField: 'country',
                        yField: ['AUTHORISED', 'REJECTED', 'PENDING'],
                        label: {
                            field: ['AUTHORISED', 'REJECTED', 'PENDING'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm'
                        },
                        /*label: {
                         field: ['AUTHORISED', 'REJECTED', 'PENDING'],
                         display: 'outside',orientation:'vertical'
                         //renderer: 'onSeriesLabelRender'
                         },*/
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
                    panelDetaCoutry.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Detail refund requests by country"
                        });
                    }
                }
            ]
        });
        panelDetaCoutry.add(chartDetaCoutry);

    },
    onCreateChartTypeChar: function (dataTypeRFND) {
        Ext.getCmp(prototype.id + '-chart3').removeAll();
        Ext.getCmp(prototype.id + '-chart4').removeAll();
        var panel3 = Ext.getCmp(prototype.id + '-chart3');
        var panel4 = Ext.getCmp(prototype.id + '-chart4');

        var arrayUser = [];
        var arrayDataTYPERFND = [];
        var arrayDataGraUser = [];
        var arrayDataGraUserTotal = [];
        for (var i = 0; i < dataTypeRFND.length; ++i) {
            if (arrayUser.indexOf(String(dataTypeRFND[i].A3389RAUD)) < 0) {
                arrayUser.push(String(dataTypeRFND[i].A3389RAUD));
                arrayDataTYPERFND.push({
                    A3389RAUD: String(dataTypeRFND[i].A3389RAUD),
                    children: [{A3389FLAG: dataTypeRFND[i].A3389FLAG, A3389STATO: dataTypeRFND[i].A3389STATO, A3389STATU: dataTypeRFND[i].A3389STATU}]

                });
            } else {
                arrayDataTYPERFND[arrayUser.indexOf(String(dataTypeRFND[i].A3389RAUD))].children.push({A3389FLAG: dataTypeRFND[i].A3389FLAG, A3389STATO: dataTypeRFND[i].A3389STATO, A3389STATU: dataTypeRFND[i].A3389STATU});
            }
        }

        /*total por tipo de rfnd*/
        var A3389TypoTotal = 0;
        for (var i = 0; i < arrayDataTYPERFND.length; ++i) {
            A3389TypoTotal = 0;
            for (var vi = 0; vi < arrayDataTYPERFND[i].children.length; ++vi) {
                A3389TypoTotal += parseFloat(arrayDataTYPERFND[i].children[vi].A3389FLAG) + parseFloat(arrayDataTYPERFND[i].children[vi].A3389STATO) + parseFloat(arrayDataTYPERFND[i].children[vi].A3389STATU);
            }
            arrayDataGraUserTotal.push({country: arrayDataTYPERFND[i].A3389RAUD, total: A3389TypoTotal});
        }
        var store3Total = Ext.create('Ext.data.Store', {
            fields: ['country', 'total'],
            data: arrayDataGraUserTotal
        });
        var chart03 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosTypeRfnd',
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 400,
                    reference: 'chart',
                    captions: {
                        title: 'Total type refund requests'

                    },
                    theme: {
                        type: 'blue'
                    },
                    store: store3Total,
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: 'total',
                            //maximum: 4000,
                            majorTickSteps: 10,
                            label: {
                                textAlign: 'right'
                            },
                            renderer: 'onAxisLabelRender',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                                },
                                even: {
                                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'total',
                            style: {
                                minGapWidth: 20
                            },
                            highlightCfg: {
                                saturationFactor: 1.5
                            },
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltipRender'
                            }
                        }]
                }],
            listeners: {
                afterrender: function (obj) {
                    panel3.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Total type refund requests"
                        });
                    }
                }
            ]
        });
        panel3.add(chart03);
        /*fin del tipo rfnd*/

        var VL_A3389FLAG = 0;
        var VL_A3389STATO = 0;
        var VL_A3389STATU = 0;
        var vl_A3389FLAGPJE = 0;
        var vlA3389STATOPJE = 0;
        var vl_A3389STATUPJE = 0;
        var vl_TOTAL = 0;

        for (var i = 0; i < dataTypeRFND.length; i++) {
            VL_A3389FLAG += parseFloat(dataTypeRFND[i].A3389FLAG);
            VL_A3389STATO += parseFloat(dataTypeRFND[i].A3389STATO);
            VL_A3389STATU += parseFloat(dataTypeRFND[i].A3389STATU);
        }
        vl_TOTAL = (VL_A3389FLAG + VL_A3389STATO + VL_A3389STATU);
        vl_A3389FLAGPJE = win.formatLngNumber(((VL_A3389FLAG * 100) / vl_TOTAL));
        vlA3389STATOPJE = win.formatLngNumber(((VL_A3389STATO * 100) / vl_TOTAL));
        vl_A3389STATUPJE = win.formatLngNumber(((VL_A3389STATU * 100) / vl_TOTAL));

        var store4 = Ext.create('Ext.data.Store', {
            fields: ['os', 'data1'],
            data: [
                {os: 'TOTAL', data1: vl_A3389FLAGPJE, label: vl_A3389FLAGPJE + '%'},
                {os: 'PARTIAL', data1: vlA3389STATOPJE, label: vlA3389STATOPJE + '%'},
                {os: 'SININFOMA', data1: vl_A3389STATUPJE, label: vl_A3389STATUPJE + '%'}

            ]
        });
        var chart4 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosTypeRfndDetalle',
            items: [{
                    xtype: 'polar',
                    reference: 'chart',
                    captions: {
                        title: 'Total type refund requests %'
                    },
                    innerPadding: 40,
                    width: '100%',
                    height: 370,
                    store: store4,
                    theme: 'Muted',
                    interactions: ['itemhighlight', 'rotate'],
                    legend: {
                        type: 'sprite',
                        docked: 'bottom'
                    },
                    series: [
                        {
                            type: 'pie3d',
                            angleField: 'data1',
                            donut: 30,
                            distortion: 0.6,
                            highlight: {
                                margin: 40
                            },
                            label: {
                                field: 'os', diplay: 'inside',
                                renderer: function (text, sprite, config, rendererData, index) {
                                    return rendererData.store.getAt(index).get('label');
                                }
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        }
                    ]
                }, {
                    xtype: 'container',
                    width: '100%',
                    padding: 10,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: {
                        xtype: 'form',
                        defaults: {
                            labelAlign: 'right',
                            labelPad: 15,
                            width: 400
                        }
                    }
                }], listeners: {
                afterrender: function (obj) {
                    panel4.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Total type refund requests %”"
                        });
                    }
                }
            ]
        });
        panel4.add(chart4);

    },
    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%');
    },
    onCreateChart: function (Objtemp, ObjtempUserTypeRFND) {
        var me = this;
        Ext.getCmp(prototype.id + '-chart').removeAll();
        var panel1 = Ext.getCmp(prototype.id + '-chart');
        var arrayUser = [];
        var arrayDataUser = [];
        var arrayDataGraUser = [];
        var arrayDataGraUserTotal = [];
        for (var i = 0; i < Objtemp.length; ++i) {
            if (arrayUser.indexOf(String(Objtemp[i].A3389REGAS)) < 0) {
                arrayUser.push(String(Objtemp[i].A3389REGAS));
                arrayDataUser.push({
                    A3389REGAS: String(Objtemp[i].A3389REGAS),
                    children: [{A3389FLAG: Objtemp[i].A3389FLAG, A3389STATO: Objtemp[i].A3389STATO, A3389STATU: Objtemp[i].A3389STATU}]

                });
            } else {
                arrayDataUser[arrayUser.indexOf(String(Objtemp[i].A3389REGAS))].children.push({A3389FLAG: Objtemp[i].A3389FLAG, A3389STATO: Objtemp[i].A3389STATO, A3389STATU: Objtemp[i].A3389STATU});
            }
        }
        /////////////strore para totales
        var A3389FLAG = 0;
        var A3389STATO = 0;
        var A3389STATU = 0;
        for (var i = 0; i < arrayDataUser.length; ++i) {
            A3389FLAG = 0;
            A3389STATO = 0;
            A3389STATU = 0;
            for (var vi = 0; vi < arrayDataUser[i].children.length; ++vi) {
                A3389FLAG += parseFloat(arrayDataUser[i].children[vi].A3389FLAG);
                A3389STATO += parseFloat(arrayDataUser[i].children[vi].A3389STATO);
                A3389STATU += parseFloat(arrayDataUser[i].children[vi].A3389STATU);
            }
            arrayDataGraUser.push({country: arrayDataUser[i].A3389REGAS, AUTHORISED: A3389FLAG, REJECTED: A3389STATO, PENDING: A3389STATU});
        }


        //////sumario para el auditor

        var A3389total = 0;
        me.totalUsers = 0;
        for (var i = 0; i < arrayDataUser.length; ++i) {
            A3389total = 0;
            for (var vi = 0; vi < arrayDataUser[i].children.length; ++vi) {
                A3389total += parseFloat(arrayDataUser[i].children[vi].A3389FLAG) + parseFloat(arrayDataUser[i].children[vi].A3389STATO) + parseFloat(arrayDataUser[i].children[vi].A3389STATU);
                me.totalUsers += A3389total;
            }
            arrayDataGraUserTotal.push({country: arrayDataUser[i].A3389REGAS, total: A3389total, porcentaje: (Ext.util.Format.number((A3389total / me.totalUsers) * 100, '0.00'))});
        }
        //console.log(arrayDataGraUserTotal);
        // console.log(arrayDataGraUserTotal);
        var store1Total = Ext.create('Ext.data.Store', {
            fields: ['country', 'total'],
            data: arrayDataGraUserTotal
        });
        ///
        var chart01 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosUserPrin',
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 400,
                    reference: 'chart',
                    captions: {
                        title: 'Refund requests attended by auditor'

                    },
                    /* theme: {
                     type: 'blue'
                     },*/
                    store: store1Total,
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: 'total',
                            //maximum: 4000,
                            majorTickSteps: 10,
                            label: {
                                textAlign: 'right'
                            },
                            renderer: 'onAxisLabelRender',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                                },
                                even: {
                                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'total',
                            style: {
                                minGapWidth: 20
                            },
                            highlightCfg: {
                                saturationFactor: 1.5
                            },
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender_Porce'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltipRenderporce'
                            }
                        }/*,{
                         type: 'line',
                         axis: 'left',
                         xField: 'country',
                         yField: 'total',
                         tips: {
                         trackMouse: true,
                         renderer: function(storeItem, item) {
                         this.setTitle(storeItem.get('total') + ' visits in ' + storeItem.get('country'));
                         }
                         },
                         style: {
                         fill: '#18428E',
                         stroke: '#18428E',
                         'stroke-width': 3
                         },
                         markerConfig: {
                         type: 'circle',
                         size: 4,
                         radius: 4,
                         'stroke-width': 0,
                         fill: '#18428E',
                         stroke: '#18428E'
                         }
                         }*/]
                }],
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
                            filename: "Refund requests attended by auditor"
                        });
                    }
                }
            ]
        });
        panel1.add(chart01);
        ///fin de la sumaria
        Ext.getCmp(prototype.id + '-chart2').removeAll();
        var panel2 = Ext.getCmp(prototype.id + '-chart2');

        var store1 = Ext.create('Ext.data.Store', {
            fields: ['country', 'AUTHORISED', 'REJECTED', 'PENDING'],
            data: arrayDataGraUser
        });
        var chart02 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficos2_deta',
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 400,
                    captions: {
                        title: {
                            text: 'Refund requests authorised and rejected by auditor',
                            alignTo: 'chart'
                        },
                        subtitle: {
                            // text: 'Quarter-wise comparison',
                            alignTo: 'chart'
                        }
                    },
                    theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: store1,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['AUTHORISED', 'REJECTED', 'PENDING'],
                            grid: true//,
                                    //title: 'Sales in USD',
                                    // renderer: 'onAxisLabelRender'
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            /* title: {
                             text: 'Years',
                             translationX: - 30
                             },*/
                            grid: true
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['AUTHORISED', 'REJECTED', 'PENDING'],
                        xField: 'country',
                        yField: ['AUTHORISED', 'REJECTED', 'PENDING'],
                        label: {
                            field: ['AUTHORISED', 'REJECTED', 'PENDING'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm'
                        },
                        /*label: {
                         field: ['AUTHORISED', 'REJECTED', 'PENDING'],
                         display: 'outside',orientation:'vertical'
                         //renderer: 'onSeriesLabelRender'
                         },*/
                        highlight: true,
                        style: {
                            inGroupGapWidth: -7
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: 'onTooltip2Render'
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
                            filename: "Refund requests authorised and rejected by auditor"
                        });
                    }
                }
            ]
        });
        panel2.add(chart02);



        /*inicio por tipo de rfnd por uaurio para el segundo tap*/
        Ext.getCmp(prototype.id + '-chart21').removeAll();
        var panel21 = Ext.getCmp(prototype.id + '-chart21');
        var arraychart2 = [];
        var arrayDatachart2 = [];
        var arrayDataGrachart2 = [];
        for (var i = 0; i < ObjtempUserTypeRFND.length; ++i) {
            if (arraychart2.indexOf(String(ObjtempUserTypeRFND[i].A3389REGAS)) < 0) {
                arraychart2.push(String(ObjtempUserTypeRFND[i].A3389REGAS));
                arrayDatachart2.push({
                    A3389REGAS: String(ObjtempUserTypeRFND[i].A3389REGAS),
                    children: [{A3389FLAG: ObjtempUserTypeRFND[i].A3389FLAG, A3389STATO: ObjtempUserTypeRFND[i].A3389STATO, A3389STATU: ObjtempUserTypeRFND[i].A3389STATU}]

                });
            } else {
                arrayDatachart2[arraychart2.indexOf(String(ObjtempUserTypeRFND[i].A3389REGAS))].children.push({A3389FLAG: ObjtempUserTypeRFND[i].A3389FLAG, A3389STATO: ObjtempUserTypeRFND[i].A3389STATO, A3389STATU: ObjtempUserTypeRFND[i].A3389STATU});
            }
        }
        var A3389FLAG = 0;
        var A3389STATO = 0;
        var A3389STATU = 0;
        for (var i = 0; i < arrayDatachart2.length; ++i) {
            A3389FLAG = 0;
            A3389STATO = 0;
            A3389STATU = 0;
            for (var vi = 0; vi < arrayDatachart2[i].children.length; ++vi) {
                A3389FLAG += parseFloat(arrayDatachart2[i].children[vi].A3389FLAG);
                A3389STATO += parseFloat(arrayDatachart2[i].children[vi].A3389STATO);
                A3389STATU += parseFloat(arrayDatachart2[i].children[vi].A3389STATU);
            }
            arrayDataGrachart2.push({country: arrayDatachart2[i].A3389REGAS, TOTAL: A3389FLAG, PARTIAL: A3389STATO, PENDING: A3389STATU});
        }
        var store21 = Ext.create('Ext.data.Store', {
            fields: ['country', 'TOTAL', 'PARTIAL', 'PENDING'],
            data: arrayDataGrachart2
        });
        var chart21 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosTypeAuditor',
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 400,
                    captions: {
                        title: {
                            text: 'Type refund requests attended by auditor',
                            alignTo: 'chart'
                        },
                        subtitle: {
                            // text: 'Quarter-wise comparison',
                            alignTo: 'chart'
                        }
                    },
                    theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: store21,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['TOTAL', 'PARTIAL', 'PENDING'],
                            grid: true, //,
                            //title: 'Sales in USD',
                            renderer: 'onAxisLabelRender'
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            /* title: {
                             text: 'Years',
                             translationX: - 30
                             },*/
                            grid: true
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['TOTAL', 'PARTIAL', 'PENDING'],
                        xField: 'country',
                        yField: ['TOTAL', 'PARTIAL', 'PENDING'],
                        label: {
                            field: ['TOTAL', 'PARTIAL', 'PENDING'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm'
                        },
                        /* label: {
                         field: ['TOTAL', 'PARTIAL', 'PENDING'],
                         display: 'outside',orientation:'vertical'
                         //renderer: 'onSeriesLabelRender'
                         },*/
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
                    panel21.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Type refund requests attended by auditor"
                        });
                    }
                }
            ]
        });
        panel21.add(chart21);
        /*fin por tipo de rfnd por uaurio para el segundo tap*/

    },
    onTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('country') + ': ' +
                Ext.util.Format.number(record.get('total'), '0,000 (RFND)'));
    },
    onTooltipRenderporce: function (tooltip, record, item) {
        var me = this;
        tooltip.setHtml(record.get('country') + ': ' + Ext.util.Format.number(record.get('total'), '0,000 (RFND)') + ' ' + '(' + Ext.util.Format.number((record.get('total') / me.totalUsers) * 100, '0.00') + ') %');
    },
    onTooltipRenderporce2: function (tooltip, record, item) {
        var me = this;
        tooltip.setHtml(record.get('country') + ': ' + Ext.util.Format.number(record.get('total'), '0,000 (RFND)') + '  ' + '(' + Ext.util.Format.number((record.get('total') / me.totalcountry) * 100, '0.00') + ') %');
    },
    onTooltipRenderporce3: function (tooltip, record, item) {
        var me = this;
        tooltip.setHtml(record.get('country') + ': ' + Ext.util.Format.number(record.get('total'), '0,000 (RFND)') + '  ' + '(' + Ext.util.Format.number((record.get('total') / me.TotalDia) * 100, '0.00') + ') %');
    },
    onTooltipRenderporce4: function (tooltip, record, item) {
        var me = this;
        tooltip.setHtml(record.get('country') + ': ' + Ext.util.Format.number(record.get('total'), '0,000 (RFND)') + '  ' + '(' + Ext.util.Format.number((record.get('total') / me.TOTALRFNDFOPREASON) * 100, '0.00') + ') %');
    },
    onTooltipRenderporce5: function (tooltip, record, item) {
        var me = this;
        tooltip.setHtml(record.get('country') + ': ' + Ext.util.Format.number(record.get('total'), '0,000 (RFND)') + '  ' + '(' + Ext.util.Format.number((record.get('total') / me.TOTALRFNDFOPREASON2) * 100, '0.00') + ') %');
    },
    onTooltipRenderporce6: function (tooltip, record, item) {
        var me = this;
        tooltip.setHtml(record.get('country') + ': ' + Ext.util.Format.number(record.get('total'), '0,000 (RFND)') + '  ' + '(' + Ext.util.Format.number((record.get('total') / me.TOTALRFNDFOPREASON3) * 100, '0.00') + ') %');
    },

    onTooltip8Render: function (tooltip, record, item) {
        tooltip.setHtml(record.get('country') + ': ' +
                Ext.util.Format.number(record.get('total'), '0,000 (RFND)'));
    },
    onTooltip2Render: function (tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    onTooltip3Render: function (tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    /* onTooltip3Render: function (tooltip, record, item) {
     tooltip.setHtml(record.get('country') + ': ' +
     Ext.util.Format.number(record.get('total'), '0,000 (RFND)'));
     },*/
    onSeriesLabelRenderm: function (value) {
        return Ext.util.Format.number(value, '0,000');
    },
    onSeriesLabelRender: function (v) {
        if (v > 100000) {
            return Ext.util.Format.number(v / 1000, '0,000');
        } else {
            return Ext.util.Format.number(v, '0,000');
        }
    },
    onSeriesLabelRender_Porce: function (v) {
        var me = this;
        if (v > 100000) {
            return Ext.util.Format.number(v / 1000, '0,000') + ' (' + Ext.util.Format.number((v / me.totalUsers) * 100, '0.00') + ') %';
            //return Ext.util.Format.number(v / 1000, '0,000');
        } else {
            //return Ext.util.Format.number(v, '0,000');
            return Ext.util.Format.number(v, '0,000') + ' (' + Ext.util.Format.number((v / me.totalUsers) * 100, '0.00') + ') %';
        }
    },
    onSeriesLabelRender_Porce2: function (v) {
        var me = this;
        if (v > 100000) {
            return Ext.util.Format.number(v / 1000, '0,000') + ' (' + Ext.util.Format.number((v / me.totalcountry) * 100, '0.00') + ') %';
            //return Ext.util.Format.number(v / 1000, '0,000');
        } else {
            //return Ext.util.Format.number(v, '0,000');
            return Ext.util.Format.number(v, '0,000') + ' (' + Ext.util.Format.number((v / me.totalcountry) * 100, '0.00') + ') %';
        }
    },
    onSeriesLabelRender_Porce3: function (v) {
        var me = this;
        if (v > 100000) {
            return Ext.util.Format.number(v / 1000, '0,000') + ' (' + Ext.util.Format.number((v / me.TotalDia) * 100, '0.00') + ') %';
            //return Ext.util.Format.number(v / 1000, '0,000');
        } else {
            //return Ext.util.Format.number(v, '0,000');
            return Ext.util.Format.number(v, '0,000') + '(' + Ext.util.Format.number((v / me.TotalDia) * 100, '0.00') + ') %';
        }
    },
    onSeriesLabelRender_Porce4: function (v) {
        var me = this;
        if (v > 100000) {
            return Ext.util.Format.number(v / 1000, '0,000') + ' (' + Ext.util.Format.number((v / me.TOTALRFNDFOPREASON) * 100, '0.00') + ') %';
            //return Ext.util.Format.number(v / 1000, '0,000');
        } else {
            //return Ext.util.Format.number(v, '0,000');
            return Ext.util.Format.number(v, '0,000') + ' (' + Ext.util.Format.number((v / me.TOTALRFNDFOPREASON) * 100, '0.00') + ') %';
        }
    },
    onSeriesLabelRender_Porce5: function (v) {
        var me = this;
        if (v > 100000) {
            return Ext.util.Format.number(v / 1000, '0,000') + ' (' + Ext.util.Format.number((v / me.TOTALRFNDFOPREASON2) * 100, '0.00') + ') %';
            //return Ext.util.Format.number(v / 1000, '0,000');
        } else {
            //return Ext.util.Format.number(v, '0,000');
            return Ext.util.Format.number(v, '0,000') + ' (' + Ext.util.Format.number((v / me.TOTALRFNDFOPREASON2) * 100, '0.00') + ') %';
        }
    },
    onSeriesLabelRender_Porce6: function (v) {
        var me = this;
        if (v > 100000) {
            return Ext.util.Format.number(v / 1000, '0,000') + ' (' + Ext.util.Format.number((v / me.TOTALRFNDFOPREASON3) * 100, '0.00') + ') %';
            //return Ext.util.Format.number(v / 1000, '0,000');
        } else {
            //return Ext.util.Format.number(v, '0,000');
            return Ext.util.Format.number(v, '0,000') + ' (' + Ext.util.Format.number((v / me.TOTALRFNDFOPREASON3) * 100, '0.00') + ') %';
        }
    },
    onSeriesLabelRender2: function (v) {
        if (v > 100000) {
            return Ext.util.Format.number(v / 1000, '0,000');
        } else {
            return Ext.util.Format.number(v, '0,000');
        }
    },
    onAxisLabelRender: function (axis, label, layoutContext) {
        if (label > 100000) {
            return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
        } else {
            return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
        }
    },
    onTooltipRender3: function (tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    onTooltipRender4: function (tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    onAxisLabel2Render: function (axis, label, layoutContext) {

        if (label > 100000) {
            return Ext.util.Format.number(layoutContext.renderer(label) / 8000, '0,000');
        } else {
            return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
        }
    },
    onAxisLabel3Render: function (axis, label, layoutContext) {

        if (label > 100000) {
            return Ext.util.Format.number(layoutContext.renderer(label) / 8000, '0,000');
        } else {
            return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
        }
    },
    onAxisLabel4Render: function (axis, label, layoutContext) {

        if (label > 100000) {
            return Ext.util.Format.number(layoutContext.renderer(label) / 8000, '0,000');
        } else {
            return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
        }
    },
    onAxisLabel5Render: function (axis, label, layoutContext) {

        if (label > 100000) {
            return Ext.util.Format.number(layoutContext.renderer(label) / 8000, '0,000');
        } else {
            return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
        }
    },
    onAxisRangeChange: function (axis, range) {
        if (!range) {
            return;
        }
        // expand the range slightly to make sure markers aren't clipped
        if (range[1] > 15000000) {
            range[1] = 18000000;
        } else if (range[1] > 100000) {
            range[1] = 90000;
        } else if (range[1] > 90000) {
            range[1] = 50000;
        } else if (range[1] > 4000) {
            range[1] = 5000;
        } else if (range[1] > 1500) {
            range[1] = 2000;
        } else if (range[1] > 1000) {
            range[1] = 1500;
        } else if (range[1] > 500) {
            range[1] = 1000;
        } else if (range[1] > 400) {
            range[1] = 500;
        } else if (range[1] > 300) {
            range[1] = 400;
        } else if (range[1] > 200) {
            range[1] = 300;
        } else if (range[1] > 100) {
            range[1] = 200;
        } else if (range[1] > 50) {
            range[1] = 100;
        } else if (range[1] > 20) {
            range[1] = 30;
        } else {
            range[1] = 20;
        }

    },
    onAxisRangeChange2: function (axis, range) {
        if (!range) {
            return;
        }
        // expand the range slightly to make sure markers aren't clipped
        if (range[1] > 15000000) {
            range[1] = 18000000;
        } else if (range[1] > 100000) {
            range[1] = 90000;
        } else if (range[1] > 90000) {
            range[1] = 50000;
        } else if (range[1] > 4000) {
            range[1] = 5000;
        } else if (range[1] > 1500) {
            range[1] = 2000;
        } else if (range[1] > 1000) {
            range[1] = 1500;
        } else if (range[1] > 500) {
            range[1] = 1000;
        } else if (range[1] > 400) {
            range[1] = 500;
        } else if (range[1] > 300) {
            range[1] = 400;
        } else if (range[1] > 200) {
            range[1] = 300;
        } else if (range[1] > 100) {
            range[1] = 200;
        } else {
            range[1] = 100;
        }

    },
    onAxisRangeChange3: function (axis, range) {
        if (!range) {
            return;
        }
        // expand the range slightly to make sure markers aren't clipped
        if (range[1] > 15000000) {
            range[1] = 18000000;
        } else if (range[1] > 100000) {
            range[1] = 90000;
        } else if (range[1] > 90000) {
            range[1] = 50000;
        } else if (range[1] > 4000) {
            range[1] = 5000;
        } else if (range[1] > 1500) {
            range[1] = 2000;
        } else if (range[1] > 1000) {
            range[1] = 1500;
        } else if (range[1] > 500) {
            range[1] = 1000;
        } else if (range[1] > 400) {
            range[1] = 500;
        } else if (range[1] > 300) {
            range[1] = 400;
        } else if (range[1] > 200) {
            range[1] = 300;
        } else if (range[1] > 100) {
            range[1] = 200;
        } else {
            range[1] = 100;
        }

    },
    onAxisRangeChange4: function (axis, range) {
        if (!range) {
            return;
        }
        // expand the range slightly to make sure markers aren't clipped
        if (range[1] > 15000000) {
            range[1] = 18000000;
        } else if (range[1] > 100000) {
            range[1] = 90000;
        } else if (range[1] > 90000) {
            range[1] = 50000;
        } else if (range[1] > 4000) {
            range[1] = 5000;
        } else if (range[1] > 1500) {
            range[1] = 2000;
        } else if (range[1] > 1000) {
            range[1] = 1500;
        } else if (range[1] > 500) {
            range[1] = 1000;
        } else if (range[1] > 400) {
            range[1] = 500;
        } else if (range[1] > 300) {
            range[1] = 400;
        } else if (range[1] > 200) {
            range[1] = 300;
        } else if (range[1] > 100) {
            range[1] = 200;
        } else {
            range[1] = 100;
        }

    },
    onStackedToggle: function (segmentedButton, button, pressed) {
        var chart1 = this.lookup('chart'),
                series2 = chart1.getSeries()[0],
                value = segmentedButton.getValue();
        series2.setStacked(value === 0);
        chart1.redraw();
    },
    onStackedToggle2: function (segmentedButton, button, pressed) {
        var chart = this.lookup('chart2'),
                series = chart.getSeries()[0],
                value = segmentedButton.getValue();
        series.setStacked(value === 0);
        chart.redraw();
    },
    onStackedToggle3: function (segmentedButton, button, pressed) {
        var chart = this.lookup('chart3'),
                series = chart.getSeries()[0],
                value = segmentedButton.getValue();
        series.setStacked(value === 0);
        chart.redraw();
    },
    onStackedToggle4: function (segmentedButton, button, pressed) {
        var chart = this.lookup('chart4'),
                series = chart.getSeries()[0],
                value = segmentedButton.getValue();
        series.setStacked(value === 0);
        chart.redraw();
    },
    onStackedToggle5: function (segmentedButton, button, pressed) {
        var chart = this.lookup('chart5'),
                series = chart.getSeries()[0],
                value = segmentedButton.getValue();
        series.setStacked(value === 0);
        chart.redraw();
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumntdAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnReason: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        if (record.get('A3389PAIS') === 'CN') {
            metaData.tdAttr = 'data-qtip="' + me.ToGB2312(value) + '"';
        } else {
            metaData.tdAttr = 'data-qtip="' + value + '"';
        }
        return value;
    },
    ToGB2312: function (str) {
        var cadena = str.replace(/\\u/gi, '%u');
        cadena = cadena.replace(/\\n/gi, "\n");
        cadena = cadena.replace(/\\t/gi, "\t");
        return unescape(cadena);
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3389SEMAF'))) {
            case 'ORANGE':
                value = 'orange';
                break;
            case 'GREEN':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onclickshow: function (bean) {
        //Ext.getCmp(prototype.id + '-Contenedor').mask('Please Wait....');
        Ext.Ajax.request({
            url: prototype.url + '/SearchReportStatis',
            method: 'POST',
            timeout: '300000',
            params: {beanString: JSON.stringify(bean)},
            success: function (response, options) {
                //Ext.getCmp(prototype.id + '-Contenedor').unmask();
                var res = Ext.JSON.decode(response.responseText);
                me.onCreateChart(res.datastadis, res.dataUserTypeRFND);
                me.onCreateChartTypeChar(res.dataTypeRFND);
                me.onCreateCOUTRY(res.datastadPais);
                me.onCreateGeneralChar(res.datastadFauto);
                me.onCreateTipopago(res.dataTYPEPAGO, res.dataRAZONES, res.dataRAZONES_REJECT);
                me.onCreateDias(res.dataDIAS);

            }
        });
    },
    onCreateDias: function (dataDIAS) {
        //console.log(dataDIAS);
        Ext.getCmp(prototype.id + '-chart10').removeAll();
        Ext.getCmp(prototype.id + '-chart11').removeAll();
        var panel10 = Ext.getCmp(prototype.id + '-chart10');
        var panel11 = Ext.getCmp(prototype.id + '-chart11');
        var arrayDays = [];
        var arrayDataDays = [];
        var arrayDataGraDaysTotal = [];
        for (var i = 0; i < dataDIAS.length; ++i) {
            if (arrayDays.indexOf(String(dataDIAS[i].A3389DIAS)) < 0) {
                arrayDays.push(String(dataDIAS[i].A3389DIAS));
                arrayDataDays.push({
                    A3389DIAS: String(dataDIAS[i].A3389DIAS),
                    children: [{A3389FLAG: dataDIAS[i].A3389FLAG, A3389STATO: dataDIAS[i].A3389STATO, A3389STATU: dataDIAS[i].A3389STATU, A3389CANTPEDI: dataDIAS[i].A3389CANTPEDI, A3389CANTPROC: dataDIAS[i].A3389CANTPROC, A3389PENSUM: dataDIAS[i].A3389PENSUM, A3389PENPJESUM: dataDIAS[i].A3389PENPJESUM, A3389APROVSUM: dataDIAS[i].A3389APROVSUM}]

                });
            } else {
                arrayDataDays[arrayDays.indexOf(String(dataDIAS[i].A3389DIAS))].children.push({A3389FLAG: dataDIAS[i].A3389FLAG, A3389STATO: dataDIAS[i].A3389STATO, A3389STATU: dataDIAS[i].A3389STATU, A3389CANTPEDI: dataDIAS[i].A3389CANTPEDI, A3389CANTPROC: dataDIAS[i].A3389CANTPROC, A3389PENSUM: dataDIAS[i].A3389PENSUM, A3389PENPJESUM: dataDIAS[i].A3389PENPJESUM, A3389APROVSUM: dataDIAS[i].A3389APROVSUM});
            }
        }

        var A3389total = 0;
        for (var i = 0; i < arrayDataDays.length; ++i) {
            A3389total = 0;
            for (var vi = 0; vi < arrayDataDays[i].children.length; ++vi) {
                A3389total += parseFloat(arrayDataDays[i].children[vi].A3389FLAG) + parseFloat(arrayDataDays[i].children[vi].A3389STATO) + parseFloat(arrayDataDays[i].children[vi].A3389STATU) + parseFloat(arrayDataDays[i].children[vi].A3389CANTPEDI) + parseFloat(arrayDataDays[i].children[vi].A3389CANTPROC) + parseFloat(arrayDataDays[i].children[vi].A3389PENSUM) + parseFloat(arrayDataDays[i].children[vi].A3389PENPJESUM) + parseFloat(arrayDataDays[i].children[vi].A3389APROVSUM);
            }
            arrayDataGraDaysTotal.push({country: arrayDataDays[i].A3389DIAS + " Days", total: A3389total});
        }

        var storeDays = Ext.create('Ext.data.Store', {
            fields: ['country', 'total'],
            data: arrayDataGraDaysTotal
        });
        var chart10 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficoschartDays',
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 400,
                    reference: 'chart',
                    captions: {
                        title: 'Refund requests attention time'

                    },
                    theme: {
                        type: 'green'
                    },
                    store: storeDays,
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: 'total',
                            //maximum: 4000,
                            majorTickSteps: 10,
                            label: {
                                textAlign: 'right'
                            },
                            renderer: 'onAxisLabelRender',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                                },
                                even: {
                                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'total',
                            style: {
                                minGapWidth: 20
                            },
                            highlightCfg: {
                                saturationFactor: 1.5
                            },
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltipRender'
                            }
                        }]
                }],
            listeners: {
                afterrender: function (obj) {
                    panel10.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Refund requests attention time"
                        });
                    }
                }
            ]
        });
        panel10.add(chart10);

        var vl_CEROQTY = 0;
        var vl_UNOQTY = 0;
        var vl_DOSQTY = 0;
        var vl_TRESQTY = 0;
        var vl_CUATROQTY = 0;
        var vl_CINCOQTY = 0;
        var vl_SEISQTY = 0;
        var vl_SIEQTY = 0;
        var vl_total = 0;
        for (var i = 0; i < dataDIAS.length; i++) {
            vl_CEROQTY += parseFloat(dataDIAS[i].A3389FLAG);
            vl_UNOQTY += parseFloat(dataDIAS[i].A3389STATO);
            vl_DOSQTY += parseFloat(dataDIAS[i].A3389STATU);
            vl_TRESQTY += parseFloat(dataDIAS[i].A3389CANTPEDI);
            vl_CUATROQTY += parseFloat(dataDIAS[i].A3389CANTPROC);
            vl_CINCOQTY += parseFloat(dataDIAS[i].A3389PENSUM);
            vl_SEISQTY += parseFloat(dataDIAS[i].A3389PENPJESUM);
            vl_SIEQTY += parseFloat(dataDIAS[i].A3389APROVSUM);
        }
        vl_total = (vl_CEROQTY + vl_UNOQTY + vl_DOSQTY + vl_TRESQTY + vl_CUATROQTY + vl_CINCOQTY + vl_SEISQTY + vl_SIEQTY);
        var vl_EROPJE = 0;
        var vl_UNOPJE = 0;
        var vl_DOSPJE = 0;
        var vl_TRESPJE = 0;
        var vl_CUATROPJE = 0;
        var vl_CINCOPJE = 0;
        var vl_SEISPJE = 0;
        var vl_vl_SIEPJE = 0;
        vl_EROPJE = win.formatLngNumber(((vl_CEROQTY * 100) / vl_total));
        vl_UNOPJE = win.formatLngNumber(((vl_UNOQTY * 100) / vl_total));
        vl_DOSPJE = win.formatLngNumber(((vl_DOSQTY * 100) / vl_total));
        vl_TRESPJE = win.formatLngNumber(((vl_TRESQTY * 100) / vl_total));
        vl_CUATROPJE = win.formatLngNumber(((vl_CUATROQTY * 100) / vl_total));
        vl_CINCOPJE = win.formatLngNumber(((vl_CINCOQTY * 100) / vl_total));
        vl_SEISPJE = win.formatLngNumber(((vl_SEISQTY * 100) / vl_total));
        vl_vl_SIEPJE = win.formatLngNumber(((vl_SIEQTY * 100) / vl_total));

        var store11 = Ext.create('Ext.data.Store', {
            fields: ['os', 'data1'],
            data: [
                {os: '0 Days', data1: vl_EROPJE, label: vl_EROPJE + '%'},
                {os: '1 Days', data1: vl_UNOPJE, label: vl_UNOPJE + '%'},
                {os: '2 Days', data1: vl_DOSPJE, label: vl_DOSPJE + '%'},
                {os: '3 Days', data1: vl_TRESPJE, label: vl_TRESPJE + '%'},
                {os: '4 Days', data1: vl_CUATROPJE, label: vl_CUATROPJE + '%'},
                {os: '5 Days', data1: vl_CINCOPJE, label: vl_CINCOPJE + '%'},
                {os: '6 Days', data1: vl_SEISPJE, label: vl_SEISPJE + '%'},
                {os: 'More Days', data1: vl_vl_SIEPJE, label: vl_vl_SIEPJE + '%'}

            ]
        });

        var chart11 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficoschartDaysdetaill',
            items: [{
                    xtype: 'polar',
                    reference: 'chart',
                    captions: {
                        title: 'Detail of the RFND time %'
                    },
                    innerPadding: 40,
                    width: '100%',
                    height: 370,
                    store: store11,
                    //theme: 'Muted',
                    interactions: ['itemhighlight', 'rotate'],
                    legend: {
                        type: 'sprite',
                        docked: 'bottom'
                    },
                    series: [
                        {
                            type: 'pie3d',
                            angleField: 'data1', //'#F80F0B'  #FFBF00 '#EC0C08',
                            colors: ['#6F9F09', '#2C7498', '#FF8809', '#FFBF00', '#DD1713', '#DD1713', '#DD1713', '#DD1713'],
                            //colors: [ '#DD1713', '#EC0C08', '#F7819F', '#FA5882', '#A34346','#6F9F09', '#2C7498', '#FF8809',],
                            donut: 30,
                            distortion: 0.6,
                            highlight: {
                                margin: 40
                            },
                            label: {
                                field: 'os', diplay: 'inside',
                                renderer: function (text, sprite, config, rendererData, index) {
                                    return rendererData.store.getAt(index).get('label');
                                }
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onSeriesTooltipRender'
                            }
                        }
                    ]
                }, {
                    xtype: 'container',
                    width: '100%',
                    padding: 10,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: {
                        xtype: 'form',
                        defaults: {
                            labelAlign: 'right',
                            labelPad: 15,
                            width: 400
                        }
                    }
                }], listeners: {
                afterrender: function (obj) {
                    panel11.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Detail of the RFND time %"
                        });
                    }
                }
            ]
        });
        panel11.add(chart11);


    },
    onCreateTipopago: function (dataTYPEPAGO, dataRAZONES, dataRAZONES_REJECT) {
        Ext.getCmp(prototype.id + '-chart8').removeAll();
        Ext.getCmp(prototype.id + '-chart9').removeAll();
        Ext.getCmp(prototype.id + '-chart9_2').removeAll();
        var panel8 = Ext.getCmp(prototype.id + '-chart8');
        var panel9 = Ext.getCmp(prototype.id + '-chart9');
        var panel9_2 = Ext.getCmp(prototype.id + '-chart9_2');

        var arrayPago = [];
        var arrayDataPago = [];
        var arrayDataGraPago = [];
        var arrayDataGraPagoTotal = [];
        for (var i = 0; i < dataTYPEPAGO.length; ++i) {
            if (arrayPago.indexOf(String(dataTYPEPAGO[i].A3389ARCH1)) < 0) {
                arrayPago.push(String(dataTYPEPAGO[i].A3389ARCH1));
                arrayDataPago.push({
                    A3389ARCH1: String(dataTYPEPAGO[i].A3389ARCH1),
                    children: [{A3389STATO: dataTYPEPAGO[i].A3389STATO, A3389STATU: dataTYPEPAGO[i].A3389STATU, A3389FLAG: dataTYPEPAGO[i].A3389FLAG, A3389CANTPEDI: dataTYPEPAGO[i].A3389CANTPEDI}]

                });
            } else {
                arrayDataPago[arrayPago.indexOf(String(dataTYPEPAGO[i].A3389ARCH1))].children.push({A3389STATO: dataTYPEPAGO[i].A3389STATO, A3389STATU: dataTYPEPAGO[i].A3389STATU, A3389FLAG: dataTYPEPAGO[i].A3389FLAG, A3389CANTPEDI: dataTYPEPAGO[i].A3389CANTPEDI});
            }
        }
        /*para los totales*/

        var A3389total = 0;
        this.TOTALRFNDFOPREASON=0;
        for (var i = 0; i < arrayDataPago.length; ++i) {
            A3389total = 0;
            for (var vi = 0; vi < arrayDataPago[i].children.length; ++vi) {
                A3389total += parseFloat(arrayDataPago[i].children[vi].A3389STATO) + parseFloat(arrayDataPago[i].children[vi].A3389STATU) + parseFloat(arrayDataPago[i].children[vi].A3389FLAG) + parseFloat(arrayDataPago[i].children[vi].A3389CANTPEDI);
                this.TOTALRFNDFOPREASON += A3389total;
            }
            arrayDataGraPagoTotal.push({country: arrayDataPago[i].A3389ARCH1, total: A3389total});
        }
        var store1Total = Ext.create('Ext.data.Store', {
            fields: ['country', 'total'],
            data: arrayDataGraPagoTotal
        });
        var chart08 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficoschart08',
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 400,
                    reference: 'chart',
                    captions: {
                        title: 'FOP refund requests'

                    },
                    theme: {
                        type: 'green'
                    },
                    store: store1Total,
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: 'total',
                            //maximum: 4000,
                            majorTickSteps: 10,
                            label: {
                                textAlign: 'right'
                            },
                            renderer: 'onAxisLabelRender',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                                },
                                even: {
                                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'total',
                            style: {
                                minGapWidth: 20
                            },
                            highlightCfg: {
                                saturationFactor: 1.5
                            },
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender_Porce4'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltipRenderporce4'
                            }
                        }]
                }],
            listeners: {
                afterrender: function (obj) {
                    panel8.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "FOP refund requests"
                        });
                    }
                }
            ]
        });
        panel8.add(chart08);

        ///GRAFICO PARA Reason AM

        var arrayReason = [];
        var arrayDataReason = [];
        var arrayDataGraReasonTotal = [];
        for (var i = 0; i < dataRAZONES.length; ++i) {
            if (arrayReason.indexOf(String(dataRAZONES[i].A3389FLAG)) < 0) {
                arrayReason.push(String(dataRAZONES[i].A3389FLAG));
                arrayDataReason.push({
                    A3389FLAG: String(dataRAZONES[i].A3389FLAG),
                    children: [{A3389RCHASUM: dataRAZONES[i].A3389RCHASUM}]

                });
            } else {
                arrayDataReason[arrayReason.indexOf(String(dataRAZONES[i].A3389FLAG))].children.push({A3389RCHASUM: dataRAZONES[i].A3389RCHASUM});
            }
        }
        var totalRAZONES = 0;
        this.TOTALRFNDFOPREASON2=0;
        for (var i = 0; i < arrayDataReason.length; ++i) {
            totalRAZONES = 0;
            for (var vi = 0; vi < arrayDataReason[i].children.length; ++vi) {
                totalRAZONES += parseFloat(arrayDataReason[i].children[vi].A3389RCHASUM);
                this.TOTALRFNDFOPREASON2 += totalRAZONES;
            }
            arrayDataGraReasonTotal.push({country: arrayDataReason[i].A3389FLAG, total: totalRAZONES});
        }
        var store1Tota9 = Ext.create('Ext.data.Store', {
            fields: ['country', 'total'],
            data: arrayDataGraReasonTotal
        });
        var chart09 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficoschart09',
            layout: 'fit',
            animate: true,
            shadow: true,
            insetPadding: 40,
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 400,
                    reference: 'chart',
                    captions: {
                        title: 'Refund requests authorised for reason'

                    },
                    theme: {
                        type: 'green'
                    },
                    store: store1Tota9,
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: 'total',
                            orientation: 'vertical',
                            //maximum: 4000,
                            //majorTickSteps: 10,
                            label: {
                                textAlign: 'right'
                            },
                            renderer: 'onAxisLabelRender',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                                },
                                even: {
                                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            label: {
                                rotate: {
                                    degrees: -60
                                }
                            }
                            //grid: true,
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'total',
                            /* style: {
                             minGapWidth: 20
                             },
                             highlightCfg: {
                             saturationFactor: 1.5
                             },*/
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender_Porce5',
                                //orientation: 'horizontal'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltipRenderporce5'
                            }
                        }]
                }],
            listeners: {
                afterrender: function (obj) {
                    panel9.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Refund requests authorised for reason for refund"
                        });
                    }
                }
            ]
        });
        panel9.add(chart09);

        ///grafico recien
        var arrayReason_reject = [];
        var arrayDataReason_reject = [];
        var arrayDataGraReasonTotal_reject = [];
        for (var i = 0; i < dataRAZONES_REJECT.length; ++i) {
            if (arrayReason_reject.indexOf(String(dataRAZONES_REJECT[i].A3389FLAG)) < 0) {
                arrayReason_reject.push(String(dataRAZONES_REJECT[i].A3389FLAG));
                arrayDataReason_reject.push({
                    A3389FLAG: String(dataRAZONES_REJECT[i].A3389FLAG),
                    children: [{A3389RCHASUM: dataRAZONES_REJECT[i].A3389RCHASUM}]

                });
            } else {
                arrayDataReason_reject[arrayReason_reject.indexOf(String(dataRAZONES_REJECT[i].A3389FLAG))].children.push({A3389RCHASUM: dataRAZONES_REJECT[i].A3389RCHASUM});
            }
        }
        var totalRAZONES = 0;
        this.TOTALRFNDFOPREASON3=0;
        for (var i = 0; i < arrayDataReason_reject.length; ++i) {
            totalRAZONES = 0;
            for (var vi = 0; vi < arrayDataReason_reject[i].children.length; ++vi) {
                totalRAZONES += parseFloat(arrayDataReason_reject[i].children[vi].A3389RCHASUM);
                this.TOTALRFNDFOPREASON3 += totalRAZONES;
            }
            arrayDataGraReasonTotal_reject.push({country: arrayDataReason_reject[i].A3389FLAG, total: totalRAZONES});
        }
        var store1Tota9_2 = Ext.create('Ext.data.Store', {
            fields: ['country', 'total'],
            data: arrayDataGraReasonTotal_reject
        });
        var chart09_2 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficoschart09_02',
            layout: 'fit',
            animate: true,
            shadow: true,
            insetPadding: 40,
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 400,
                    reference: 'chart',
                    captions: {
                        title: 'Refund requests rejected for reason'

                    },
                    theme: {
                        type: 'green'
                    },
                    store: store1Tota9_2,
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: 'total',
                            orientation: 'vertical',
                            //maximum: 4000,
                            //majorTickSteps: 10,
                            label: {
                                textAlign: 'right'
                            },
                            renderer: 'onAxisLabelRender',
                            grid: {
                                odd: {
                                    fillStyle: 'rgba(255, 255, 255, 0.06)'
                                },
                                even: {
                                    fillStyle: 'rgba(0, 0, 0, 0.03)'
                                }
                            }
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'country',
                            label: {
                                rotate: {
                                    degrees: -60
                                }
                            }
                            // grid: true,
                        }],
                    series: [{
                            type: 'bar3d',
                            xField: 'country',
                            yField: 'total',
                            /* style: {
                             minGapWidth: 20
                             },
                             highlightCfg: {
                             saturationFactor: 1.5
                             },*/
                            label: {
                                field: 'total',
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRender_Porce6',
                                //orientation: 'horizontal'
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltipRenderporce6'
                            }
                        }]
                }],
            listeners: {
                afterrender: function (obj) {
                    panel9_2.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Refund requests rejected for reason"
                        });
                    }
                }
            ]
        });
        panel9_2.add(chart09_2);



    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('FORMQUERYRFND', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'I' : action;
        rec = rec === null || rec == undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.BsplinkRefundQueryRFND.DetailBsplinkRefundQueryRFND({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url01,
                url02: prototype.url02
            }
        });
        win.show();
    }

});

