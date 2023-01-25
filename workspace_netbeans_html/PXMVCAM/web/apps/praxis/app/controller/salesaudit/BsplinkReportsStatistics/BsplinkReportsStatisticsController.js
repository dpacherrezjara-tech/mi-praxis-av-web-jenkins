
Ext.define('Ext.Praxis.controller.salesaudit.BsplinkReportsStatistics.BsplinkReportsStatisticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BsplinkReportsStatisticsController',
    /**
     * Constructor
     */
    beanGeneral: {},
    beanDetalle: {},
    totalPoce: 0,
    totalPoceMes: 0,
    init: function (view) {
        var me = this;
    },
    OnBeforeShow: function () {
        prototype.id = 'BsplinkReportsStatistics';
        prototype.id2 = 'DetailBsplinkReportsStatistics';
        prototype.url = CONTEXTPATH + '/BsplinkReportsStatistics';
        prototype.url01 = CONTEXTPATH + '/BsplinkRefundQueryRFND';
        prototype.widthWindow = 1200;
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
        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "APPLICATION DATE"},
                {"code": "2", "name": "AUTHORISED - REJECTED / DATE"}
            ]
        }));

        /* var grid01 = Ext.getCmp(prototype.id + '-chart');
         var store01 = Ext.create('Ext.data.Store', {
         storeId: prototype.id1 + '-store-grid02'
         });
         
         grid01.setStore(store01);*/

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
    onLoadUsers: function () {
        var cmbUser = Ext.getCmp(prototype.id + '-txtUser');
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url01 + '/loadDataInit3',
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
        var grid01 = Ext.getCmp(prototype.id + '-gridReport');
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

        var grid02 = Ext.getCmp(prototype.id + '-grid-detail');
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid02'
        });
        grid02.setStore(store02);
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    imgSearch_clickHandler: function (obj, e) {
        var fecha = new Date().getFullYear();
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var txtAudit = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        if (txtAudit === 'ALL') {
            txtAudit = '';
        }
        if (txtAudit === 'BY AUDITOR') {
            txtAudit = 'BY';
        }

        if (ComboBy === '') {
            global.Msg({msg: 'SELECT Of By'});
            return;
        }
        if (txtFilterDateFrom == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date From", function (btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (txtFilterDateTo == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date To", function (btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }
        if (cmbDateFromMonth == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Month From", function (btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-cmbDateFromMonth').focus();", 100);
            });
            return;
        }
        if (cmbDateToMonth == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Month To", function (btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-cmbDateToMonth').focus();", 100);
            });
            return;
        }

        /*validaciones de fecha cmbDateFromMonth  cmbDateFromMonth  txtFilterDateTo cmbDateFromMonth*/
        if (fecha < txtFilterDateFrom || fecha < txtFilterDateTo) {
            Ext.MessageBox.alert('PRAXIS', "The year must be less than the one enteredm.");
            return;
        }
        if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {
            if (txtFilterDateTo < txtFilterDateFrom) {
                Ext.MessageBox.alert('PRAXIS', "The Year To must be greater than Year From.");
                return;
            }
        }
        if (cmbDateFromMonth !== '' && cmbDateToMonth !== '') {
            if (txtFilterDateFrom === txtFilterDateTo && cmbDateToMonth < cmbDateFromMonth) {
                Ext.MessageBox.alert('PRAXIS', "The Month To must be greater than Month From.");
                return;
            }
        }
        /* fin de la validaciones de la fech*/






        this.beanGeneral.IN_STATUS = '';
        //primera combinacion
        if (txtcountry != '' && txtCurrency == '' && txtAudit == '' && txtIATA == '') {
            this.beanGeneral.IN_STATUS = '1';
        }
        if (txtcountry != '' && txtCurrency != '' && txtAudit == '' && txtIATA == '') {
            this.beanGeneral.IN_STATUS = '2';
        }
        if (txtcountry != '' && txtCurrency != '' && txtAudit != '' && txtIATA == '') {
            this.beanGeneral.IN_STATUS = '3';
        }
        if (txtcountry != '' && txtCurrency != '' && txtAudit != '' && txtIATA != '') {
            this.beanGeneral.IN_STATUS = '4';
        }
        //segunda combinacion
        if (txtcountry == '' && txtCurrency != '' && txtAudit == '' && txtIATA == '') {
            this.beanGeneral.IN_STATUS = '5';
        }
        if (txtcountry == '' && txtCurrency != '' && txtAudit != '' && txtIATA == '') {
            this.beanGeneral.IN_STATUS = '6';
        }
        if (txtcountry == '' && txtCurrency != '' && txtAudit != '' && txtIATA != '') {
            this.beanGeneral.IN_STATUS = '7';
        }
        if (txtcountry == '' && txtCurrency != '' && txtAudit == '' && txtIATA != '') {
            this.beanGeneral.IN_STATUS = '8';
        }
        //tercera combinacion
        if (txtcountry == '' && txtCurrency == '' && txtAudit != '' && txtIATA == '') {
            this.beanGeneral.IN_STATUS = '9';
        }
        if (txtcountry == '' && txtCurrency == '' && txtAudit != '' && txtIATA != '') {
            this.beanGeneral.IN_STATUS = '10';
        }
        if (txtcountry != '' && txtCurrency == '' && txtAudit != '' && txtIATA == '') {
            this.beanGeneral.IN_STATUS = '11';
        }
        //FALTA
        if (txtcountry == '' && txtCurrency == '' && txtAudit == '' && txtIATA != '') {
            this.beanGeneral.IN_STATUS = '12';
        }
        //FALTA PONER
        if (txtcountry !== '' && txtCurrency === '' && txtAudit != '' && txtIATA !== '') {
            this.beanGeneral.IN_STATUS = '13';
        }


        this.beanGeneral.IN_OPTION = ComboBy;
        this.beanGeneral.IN_DATEFROM = txtFilterDateFrom + '' + win.getMonthAbbreviation(cmbDateFromMonth);
        this.beanGeneral.IN_DATETO = txtFilterDateTo + '' + win.getMonthAbbreviation(cmbDateToMonth);
        this.beanGeneral.IN_COUNTRY = txtcountry;
        this.beanGeneral.IN_DOCUMET = txtCurrency;
        this.beanGeneral.IN_USER = txtAudit;
        this.beanGeneral.IN_IATA = txtIATA;
        this.SearchReportStatisGeneral(this.beanGeneral, obj === true ? obj : false);
    },
    SearchReportStatisGeneral: function (bean, bExcel) {
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-gridReport').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridReport').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)
                            //beanString: bean

                }, callback: function (records, operation, success) {
                    var Objtemp = records;
                    me.onCreateChart(Objtemp);
                    Ext.getCmp(prototype.id + '-chart4').removeAll();
                    if (bean.IN_USER != '') {
                        me.onCreateChartUser(Objtemp);
                    }

                    /*if (records.length != 0) {
                     
                     var Objtemp = records[0].data;
                     // Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(Objtemp.A2548CATNMEMO);
                     //Ext.getCmp(prototype.id + '-lblCurrency1').setText(Objtemp.A2548MDA);
                     } else {
                     global.Msg({msg: "Data not found.", icon: 2, fn: function() {
                     }});
                     
                     }*/

                }
            });
        }

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
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        var data = rec.data;
        var ScrDetailBsplinkReportsStatistics = Ext.create('Ext.Praxis.view.salesaudit.BsplinkReportsStatistics.DetailBsplinkReportsStatistics', {id: 'DetailBsplinkReportsStatistics'});
        var controller = ScrDetailBsplinkReportsStatistics.getController();
        controller.initial_date(data, ComboBy, txtCurrency, prototype.url);
        ScrDetailBsplinkReportsStatistics.show();
    },
    OnColumnAuthoriseRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_authorise(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_authorise: function (rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        var ScrDetailBsplinkReportsStatistics = Ext.create('Ext.Praxis.view.salesaudit.BsplinkReportsStatistics.DetailBsplinkReportsStatistics', {id: 'DetailBsplinkReportsStatistics'});
        var controller = ScrDetailBsplinkReportsStatistics.getController();
        controller.initial_authorise(data, ComboBy, txtCurrency, prototype.url);
        ScrDetailBsplinkReportsStatistics.show();
    },
    OnColumnRejectRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_reject(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_reject: function (rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        var ScrDetailBsplinkReportsStatistics = Ext.create('Ext.Praxis.view.salesaudit.BsplinkReportsStatistics.DetailBsplinkReportsStatistics', {id: 'DetailBsplinkReportsStatistics'});
        var controller = ScrDetailBsplinkReportsStatistics.getController();
        controller.searchform_reject(data, ComboBy, txtCurrency, prototype.url);
        ScrDetailBsplinkReportsStatistics.show();
    },
    OnColumnPendingRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_pending(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_pending: function (rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        var ScrDetailBsplinkReportsStatistics = Ext.create('Ext.Praxis.view.salesaudit.BsplinkReportsStatistics.DetailBsplinkReportsStatistics', {id: 'DetailBsplinkReportsStatistics'});
        var controller = ScrDetailBsplinkReportsStatistics.getController();
        controller.searchform_pending(data, ComboBy, txtCurrency, prototype.url);
        ScrDetailBsplinkReportsStatistics.show();
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
    onTooltipRender: function (tooltip, record, item) {
        var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                browser = item.series.getTitle()[fieldIndex],
                value = item.sprite.attr.dataY[item.index] -
                item.sprite.attr.dataStartY[item.index];

        tooltip.setHtml(browser + ' on ' + record.get('month') + ': ' +
                Ext.util.Format.number(value, '0.##') + '%');
    },
    onCreateChartUser: function (Objtemp) {
        var pane4 = Ext.getCmp(prototype.id + '-chart4');

        var lstNewList = new Array();
        var vl_TOTALQTY_user = 0;
        for (var i = 0; i < Objtemp.length; i++) {
            var beanList = new Array(); //Objtemp[i].data;
            beanList.A3389REGAS = Objtemp[i].data.A3389REGAS;
            beanList.A3389APROVQTY = Objtemp[i].data.A3389APROVQTY;
            beanList.A3389RCHAQTY = Objtemp[i].data.A3389RCHAQTY;
            beanList.A3389PENQTY = Objtemp[i].data.A3389PENQTY;
            vl_TOTALQTY_user = vl_TOTALQTY_user + Objtemp[i].data.A3389TOTALQTY;
            lstNewList.push(beanList);
        }

        var arraySearch = [];
        var arrayData = [];
        var arrayDataGra = [];
        for (var i = 0; i < lstNewList.length; ++i) {
            if (arraySearch.indexOf(String(lstNewList[i].A3389REGAS)) < 0) {
                arraySearch.push(String(lstNewList[i].A3389REGAS));
                arrayData.push({
                    A3389REGAS: String(lstNewList[i].A3389REGAS),
                    children: [
                        {A3389RCHAQTY: lstNewList[i].A3389RCHAQTY, A3389APROVQTY: lstNewList[i].A3389APROVQTY, A3389PENQTY: lstNewList[i].A3389PENQTY}
                    ]

                });
            } else {
                arrayData[arraySearch.indexOf(String(lstNewList[i].A3389REGAS))].children.push({A3389RCHAQTY: lstNewList[i].A3389RCHAQTY, A3389APROVQTY: lstNewList[i].A3389APROVQTY, A3389PENQTY: lstNewList[i].A3389PENQTY});
            }
        }

        var totaluser = 0;
        for (var i = 0; i < arrayData.length; ++i) {
            totaluser = 0;
            for (var vi = 0; vi < arrayData[i].children.length; ++vi) {
                totaluser += parseFloat(arrayData[i].children[vi].A3389RCHAQTY) + parseFloat(arrayData[i].children[vi].A3389APROVQTY) + parseFloat(arrayData[i].children[vi].A3389PENQTY);
            }
            arrayDataGra.push({os: arrayData[i].A3389REGAS, data1: win.formatLngNumber(((totaluser * 100) / vl_TOTALQTY_user))});
        }

        var store1Total = Ext.create('Ext.data.Store', {
            fields: ['os', 'data1'],
            data: arrayDataGra
        });

        var chartUser = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficoAuditor',
            items: [{
                    xtype: 'polar',
                    reference: 'chart',
                    captions: {
                        title: 'Refund applications By Auditor %'
                    },
                    innerPadding: 40,
                    width: '100%',
                    height: 400,
                    store: store1Total,
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
                                    return rendererData.store.getAt(index).get('os') + " " + rendererData.store.getAt(index).get('data1') + '%';
                                    //console.log(rendererData.store.getAt(index).get('data1'))
                                    // return rendererData.store.getAt(index).get('label');
                                    //tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%');
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
                    pane4.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Refund applications By Auditor"
                        });
                    }
                }
            ]
        });
        pane4.add(chartUser);

        /* var chartUser = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficoAuditor',
         items: [
         {
         xtype: 'cartesian',
         width: '100%',
         height: 370,
         reference: 'chart',
         captions: {
         title: 'Refund applications By Auditor'
         
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
         renderer: 'onSeriesLabelRender'
         },
         tooltip: {
         trackMouse: true,
         renderer: 'onTooltipRender'
         }
         }]
         }],
         listeners: {
         afterrender: function(obj) {
         pane4.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function(btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "Refund applications By Auditor"
         });
         }
         }
         ]
         });
         pane4.add(chartUser);*/

    },
    onAxisLabelRender: function (axis, label, layoutContext) {
        if (label > 100000) {
            return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
        } else {
            return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
        }
    },
    onSeriesLabelRender: function (v) {
        if (v > 100000) {
            return Ext.util.Format.number(v / 1000, '0,000');
        } else {
            return Ext.util.Format.number(v, '0,000');
        }
    },
    onTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('country') + ': ' +
                Ext.util.Format.number(record.get('total'), '0,000 (RFND)'));
    },
    onCreateChart: function (Objtemp) {
        var panel = Ext.getCmp(prototype.id + '-chart');
        var pane2 = Ext.getCmp(prototype.id + '-chart2');
        var pane3 = Ext.getCmp(prototype.id + '-chart3');
        var me = this;
        me.totalPoceMes = 0;
        me.totalPoce = 0;

//primer grafico barras
        var lstNewList = new Array();
        for (var i = 0; i < Objtemp.length; i++) {
            var beanList = new Array(); //Objtemp[i].data;
            beanList.A3389FAPPI = Objtemp[i].data.A3389FAPPI;
            beanList.A3389APROVQTY = Objtemp[i].data.A3389APROVQTY;
            beanList.A3389RCHAQTY = Objtemp[i].data.A3389RCHAQTY;
            beanList.A3389PENQTY = Objtemp[i].data.A3389PENQTY;
            me.totalPoce += Objtemp[i].data.A3389TOTALQTY;
            lstNewList.push(beanList);
        }

        var arraySearch = [];
        var arrayData = [];
        var arrayDataGra = [];
        for (var i = 0; i < lstNewList.length; ++i) {
            if (arraySearch.indexOf(String(lstNewList[i].A3389FAPPI).substr(0, 4)) < 0) {
                arraySearch.push(String(lstNewList[i].A3389FAPPI).substr(0, 4));
                arrayData.push({
                    A3389FAPPI: String(lstNewList[i].A3389FAPPI).substr(0, 4),
                    children: [
                        {A3389RCHAQTY: lstNewList[i].A3389RCHAQTY, A3389APROVQTY: lstNewList[i].A3389APROVQTY, A3389PENQTY: lstNewList[i].A3389PENQTY}
                    ]

                });
            } else {
                arrayData[arraySearch.indexOf(String(lstNewList[i].A3389FAPPI).substr(0, 4))].children.push({A3389RCHAQTY: lstNewList[i].A3389RCHAQTY, A3389APROVQTY: lstNewList[i].A3389APROVQTY, A3389PENQTY: lstNewList[i].A3389PENQTY});
            }
        }

        var A3389RCHAQTY = 0;
        var A3389APROVQTY = 0;
        var A3389PENQTY = 0;
        for (var i = 0; i < arrayData.length; ++i) {
            A3389RCHAQTY = 0;
            A3389APROVQTY = 0;
            A3389PENQTY = 0;
            for (var vi = 0; vi < arrayData[i].children.length; ++vi) {
                A3389RCHAQTY += parseFloat(arrayData[i].children[vi].A3389RCHAQTY);
                A3389APROVQTY += parseFloat(arrayData[i].children[vi].A3389APROVQTY);
                A3389PENQTY += parseFloat(arrayData[i].children[vi].A3389PENQTY);
            }
            arrayDataGra.push({anio: arrayData[i].A3389FAPPI, rechazado: A3389RCHAQTY, aprobado: A3389APROVQTY, pendiente: A3389PENQTY});
        }

        var store04 = Ext.create('Ext.data.Store', {
            fields: ['anio', 'rechazado', 'aprobado', 'pendiente'],
            data: arrayDataGra

        });


        var chart01 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosAños',
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 370,
                    captions: {
                        title: {
                            text: 'Refund applications per year',
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
                    store: store04,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [
                        {
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['rechazado', 'aprobado', 'pendiente'],
                            grid: true//,
                                    //title: 'Sales in USD',
                                    // renderer: 'onAxisLabelRender'
                        },
                        {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            title: {
                                text: 'Years',
                                translationX: -30
                            },
                            grid: true
                        }
                    ],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['Authorised', 'Rejected', 'Pending'],
                        xField: 'anio',
                        yField: ['aprobado', 'rechazado', 'pendiente'],
                        label: {
                            field: ['rechazado', 'aprobado', 'pendiente'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm_Porce'
                        },
                        /*label: {
                         field: ['rechazado', 'aprobado', 'pendiente'],
                         display: 'outside',orientation:'horizontal'
                         //renderer: 'onSeriesLabelRender'
                         },*/
                        highlight: true,
                        style: {
                            inGroupGapWidth: -7
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: 'onTooltip3Render_Porce'
                        }

                    }
                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panel.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "RFND applications Years"
                        });
                    }
                }
            ]
        });
        panel.add(chart01);
///fin del primer reporte



//SEGUNDO PROCESO PIENAR
        var vl_A3389APROVQTY = 0;
        var vl_A3389RCHAQTY = 0;
        var vl_A3389PENQTY = 0;
        var vl_A3389TOTALQTY = 0;
        var vl_A3389APROVPJE = 0;
        var vl_A3389RCHAPJE = 0;
        var vl_A3389PENPJE = 0;
        for (var i = 0; i < Objtemp.length; i++) {
            vl_A3389APROVQTY += parseFloat(Objtemp[i].data.A3389APROVQTY);
            vl_A3389RCHAQTY += parseFloat(Objtemp[i].data.A3389RCHAQTY);
            vl_A3389PENQTY += parseFloat(Objtemp[i].data.A3389PENQTY);
            vl_A3389TOTALQTY += parseFloat(Objtemp[i].data.A3389TOTALQTY);
        }
        vl_A3389APROVPJE = win.formatLngNumber(((vl_A3389APROVQTY * 100) / vl_A3389TOTALQTY));
        vl_A3389RCHAPJE = win.formatLngNumber(((vl_A3389RCHAQTY * 100) / vl_A3389TOTALQTY));
        vl_A3389PENPJE = win.formatLngNumber(((vl_A3389PENQTY * 100) / vl_A3389TOTALQTY));

        var store03 = Ext.create('Ext.data.Store', {
            fields: ['os', 'data1'],
            data: [
                {os: 'Authorised', data1: vl_A3389APROVPJE, label: vl_A3389APROVPJE + '%'},
                {os: 'Rejected', data1: vl_A3389RCHAPJE, label: vl_A3389RCHAPJE + '%'},
                {os: 'Pending', data1: vl_A3389PENPJE, label: vl_A3389PENPJE + '%'}

            ]
        });


        var chart03 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficoschart',
            items: [{
                    xtype: 'polar',
                    reference: 'chart',
                    captions: {
                        title: 'Refund applications %'
                    },
                    innerPadding: 40,
                    width: '100%',
                    height: 370,
                    store: store03,
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
                    pane2.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "RFND applications Years %"
                        });
                    }
                }
            ]
        });
        pane2.add(chart03);


        /*
         var chart03 = Ext.create('Ext.panel.Panel', {
         id: prototype.id + '-graficoschart',
         items:[
         {
         xtype: 'polar',
         width: 500,
         height: 380,
         captions: {
         title: 'Refund applications %'
         },
         theme: 'default-gradients',
         width: '100%',
         insetPadding: 20,
         innerPadding: 20,
         store: store03,
         legend: {
         docked: 'bottom'
         },
         interactions: ['rotate'],
         series: [
         {
         type: 'pie',
         angleField: 'data1',
         label: {
         field: 'os',diplay:'inside',
         renderer: function(text, sprite, config, rendererData, index){
         //console.log(rendererData.store.getAt(index).get('por'));
         return rendererData.store.getAt(index).get('label');
         }
         },
         highlight: true,
         tooltip: {
         trackMouse: true,
         renderer: 'onSeriesTooltipRender'
         }
         }
         ]
         }
         ],listeners:{ 
         afterrender:function(obj){
         pane2.updateLayout();
         }
         },
         tbar: [
         '->',
         {
         xtype: 'button',
         text: 'Download',
         handler: function(btn, e, eOpts) {
         btn.up('panel').down("cartesian").download({
         filename: "RFND applications Years %"
         });
         }
         }
         ]
         });
         pane2.add(chart03);
         */
        //FIN PROCESO PIENAR

        //TERCER graficos por meses

        var lstNewMeses = new Array();
        //construir data para el primer grafico barras
        for (var i = 0; i < Objtemp.length; i++) {
            var beanListMeses = new Array(); //Objtemp[i].data;
            beanListMeses.A3389FAPPI = Objtemp[i].data.A3389FAPPI.substring(7, 4);
            beanListMeses.A3389APROVQTY = Objtemp[i].data.A3389APROVQTY;
            beanListMeses.A3389RCHAQTY = Objtemp[i].data.A3389RCHAQTY;
            beanListMeses.A3389PENQTY = Objtemp[i].data.A3389PENQTY;
            lstNewMeses.push(beanList);
        }
        var arraySearchMes = [];
        var arrayDataMes = [];
        var arrayDataMesGra = [];
        for (var i = 0; i < lstNewList.length; ++i) {
            if (arraySearchMes.indexOf(String(lstNewList[i].A3389FAPPI)) < 0) {
                arraySearchMes.push(String(lstNewList[i].A3389FAPPI));
                arrayDataMes.push({
                    A3389FAPPI: String(lstNewList[i].A3389FAPPI),
                    children: [
                        {A3389RCHAQTY: lstNewList[i].A3389RCHAQTY, A3389APROVQTY: lstNewList[i].A3389APROVQTY, A3389PENQTY: lstNewList[i].A3389PENQTY}
                    ]
                });
            } else {
                arrayDataMes[arraySearchMes.indexOf(String(lstNewList[i].A3389FAPPI))].children.push({A3389RCHAQTY: lstNewList[i].A3389RCHAQTY, A3389APROVQTY: lstNewList[i].A3389APROVQTY, A3389PENQTY: lstNewList[i].A3389PENQTY});
            }
        }
        var vp_A3389RCHAQTY = 0;
        var vp_A3389APROVQTY = 0;
        var vp_A3389PENQTY = 0;
        for (var i = 0; i < arrayDataMes.length; ++i) {
            vp_A3389RCHAQTY = 0;
            vp_A3389APROVQTY = 0;
            vp_A3389PENQTY = 0;
            for (var vi = 0; vi < arrayDataMes[i].children.length; ++vi) {
                vp_A3389RCHAQTY += parseFloat(arrayDataMes[i].children[vi].A3389RCHAQTY);
                vp_A3389APROVQTY += parseFloat(arrayDataMes[i].children[vi].A3389APROVQTY);
                vp_A3389PENQTY += parseFloat(arrayDataMes[i].children[vi].A3389PENQTY);
                me.totalPoceMes += vp_A3389RCHAQTY + vp_A3389APROVQTY + vp_A3389PENQTY;
            }
            arrayDataMesGra.push({anio: arrayDataMes[i].A3389FAPPI, rechazado: vp_A3389RCHAQTY, aprobado: vp_A3389APROVQTY, pendiente: vp_A3389PENQTY});

        }

        var store03 = Ext.create('Ext.data.Store', {
            fields: ['anio', 'rechazado', 'aprobado', 'pendiente'],
            data: arrayDataMesGra

        });
        var chart03 = Ext.create('Ext.panel.Panel', {
            id: prototype.id + '-graficosMeses',
            items: [
                {
                    xtype: 'cartesian',
                    width: '100%',
                    height: 380,
                    captions: {
                        title: {
                            text: 'Refund applications per month',
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
                    store: store03,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['rechazado', 'aprobado', 'pendiente'],
                            grid: true//,
                                    //title: 'Sales in USD',
                                    // renderer: 'onAxisLabelRender'
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'anio',
                            title: {
                                text: 'Months',
                                translationX: -30
                            },
                            grid: true
                        }],
                    series: {
                        type: 'bar3d',
                        stacked: false,
                        title: ['Authorised', 'Rejected', 'Pending'],
                        xField: 'anio',
                        yField: ['aprobado', 'rechazado', 'pendiente'],
                        label: {
                            field: ['rechazado', 'aprobado', 'pendiente'],
                            display: 'insideEnd',
                            renderer: 'onSeriesLabelRenderm'
                        },
                        /*label: {
                         field: ['rechazado', 'aprobado', 'pendiente'],
                         display: 'outside',orientation:'horizontal'
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
                    pane3.updateLayout();
                }
            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "RFND applications Months"
                        });
                    }
                }
            ]
        });
        pane3.add(chart03);


    },
    onSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%');
    },
    onSeriesLabelRenderm: function (value) {
        var me = this;
        //return Ext.util.Format.number(value, '0,000'); totalPoceMes
        return Ext.util.Format.number(value, '0,000') + ' (' + Ext.util.Format.number((value / me.totalPoceMes) * 100, '0.00') + ') %';
    },
    onSeriesLabelRenderm_Porce: function (value) {
        var me = this;
        //return Ext.util.Format.number(value, '0,000');
        return Ext.util.Format.number(value, '0,000') + ' (' + Ext.util.Format.number((value / me.totalPoce) * 100, '0.00') + ') %';
    },
    onTooltip3Render_Porce: function (tooltip, record, item) {
        var me = this;
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + Ext.util.Format.number(value, '0,000') + ' (' + Ext.util.Format.number((value / me.totalPoce) * 100, '0.00') + ') %');
    },
    onTooltip3Render: function (tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + Ext.util.Format.number(value, '0,000') + ' (' + Ext.util.Format.number((value / me.totalPoceMes) * 100, '0.00') + ') %');
    },
    OnColumnPorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value < 100) {
            return Ext.util.Format.number(value, '000.00');
        } else {
            return value;
        }

    },
    onclickshowtrend: function () {
        var me = this;
        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
            msg: 'Please Wait....'
        });
        mask.show();

        Ext.Ajax.request({
            url: prototype.url + '/SearchReportGrafico/',
            params: {beanString: JSON.stringify(me.beanGeneral)},
            success: function (response, options) {
                mask.hide();
                var res = Ext.decode(response.responseText);
                me.onCreateChartCombina(res.data);
                //Ext.getCmp(prototype.id1 + '-gridRazon').setStore(res.lstRazones);
            }
        });
    },
    onCreateChartCombina: function (ObjtempCombi) {
        var panelCombina = Ext.getCmp(prototype.id + '-chart5');
        var arrayDataTemp = [];
        var arrayDataTemp2 = [];
        var grid = Ext.getCmp(prototype.id + '-grid-detail');
        var store = grid.getStore();
        store.removeAll();

        var vl_parcial = 0;
        var vl_total = 0;
        var vl_sinfo = 0;
        var vl_PAIS = '';
        for (var i = 0; i < ObjtempCombi.length; ++i) {
            if (i === 0) {
                vl_PAIS = String(ObjtempCombi[i].A3389PAIS);
            }

            if (vl_PAIS === String(ObjtempCombi[i].A3389PAIS)) {

                if (ObjtempCombi[i].A3389RAUD === 'PARTIAL') {
                    vl_parcial += parseFloat(ObjtempCombi[i].A3389CANT);
                }
                if (ObjtempCombi[i].A3389RAUD === 'TOTAL') {
                    vl_total += parseFloat(ObjtempCombi[i].A3389CANT);
                }
                if (ObjtempCombi[i].A3389RAUD === 'NO INFORMATION') {
                    vl_sinfo += parseFloat(ObjtempCombi[i].A3389CANT);
                }



            } else {
                vl_PAIS = String(ObjtempCombi[i].A3389PAIS);
                if (ObjtempCombi[i].A3389RAUD === 'PARTIAL') {
                    vl_parcial += parseFloat(ObjtempCombi[i].A3389CANT);
                }
                if (ObjtempCombi[i].A3389RAUD === 'TOTAL') {
                    vl_total += parseFloat(ObjtempCombi[i].A3389CANT);
                }
                if (ObjtempCombi[i].A3389RAUD === 'NO INFORMATION') {
                    vl_sinfo += parseFloat(ObjtempCombi[i].A3389CANT);
                }

            }

            arrayDataTemp2.push({A3389PAIS: String(ObjtempCombi[i].A3389PAIS),
                A3389REGAS: String(ObjtempCombi[i].A3389REGAS),
                A3389RAUD: String(ObjtempCombi[i].A3389RAUD),
                A3389CANTPRI: ObjtempCombi[i].A3389CANT,
                A3389TOTALPRI: ObjtempCombi[i].A3389TOTAL}

            );
            try {

                if (ObjtempCombi[i].A3389PAIS !== ObjtempCombi[i + 1].A3389PAIS) {
                    arrayDataTemp.push({A3389PAIS: vl_PAIS,
                        PARCIAL: vl_parcial,
                        TOTAL: vl_total,
                        SININFO: vl_sinfo,
                        users: arrayDataTemp2
                    });
                    var arrayDataTemp2 = [];
                    vl_parcial = 0;
                    vl_total = 0;
                    vl_sinfo = 0;
                }

            } catch (e) {

                arrayDataTemp.push({A3389PAIS: vl_PAIS,
                    PARCIAL: vl_parcial,
                    TOTAL: vl_total,
                    SININFO: vl_sinfo,
                    users: arrayDataTemp2
                });
                var arrayDataTemp2 = [];
                vl_parcial = 0;
                vl_total = 0;
                vl_sinfo = 0;
            }


        }
        var chart = Ext.create('Ext.panel.Panel', {
            items: [
                {
                    xtype: 'cartesian',
                    width: 970,
                    height: 360,
                    captions: {
                        title: {
                            text: 'Top ten countries highest refund applications',
                            alignTo: 'chart'
                        },
                        subtitle: {
                            alignTo: 'chart'
                        }
                    },
                    theme: 'Muted',
                    interactions: ['itemhighlight'],
                    animation: {
                        duration: 200
                    },
                    store: arrayDataTemp,
                    legend: {
                        type: 'dom',
                        docked: 'bottom'
                    },
                    axes: [{
                            type: 'numeric3d',
                            position: 'left',
                            fields: ['TOTAL','PARCIAL', 'SININFO'],
                            grid: true
                        }, {
                            type: 'category3d',
                            position: 'bottom',
                            fields: 'A3389PAIS',
                            title: {
                                //text: 'Months',
                                translationX: -30
                            },
                            grid: true
                        }],
                    series: [{
                            type: 'bar3d',
                            stacked: false,
                            title: ['TOTAL','PARCIAL', 'SININFO'],
                            xField: 'A3389PAIS',
                            yField: ['TOTAL','PARCIAL', 'SININFO'],
                            label: {
                                field: ['TOTAL','PARCIAL', 'SININFO'],
                                display: 'insideEnd',
                                renderer: 'onSeriesLabelRenderm_Combi'
                            },
                            highlight: true,
                            style: {
                                inGroupGapWidth: -7
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: 'onTooltip3Render_Combi'
                            }

                        }], plugins: {
                        ptype: 'chartitemevents',
                        moveEvents: true
                    }, listeners: {

                        itemclick: function (series, item, event, eOpts) {
                            var arraySearchGrilla = [];
                            var arrayDataGrilla = [];
                            var arrayDataGraGrilla = [];
                            for (var i = 0; i < item.record.get('users').length; ++i) {
                                if (arraySearchGrilla.indexOf(String(item.record.get('users')[i].A3389REGAS)) < 0) {
                                    arraySearchGrilla.push(String(item.record.get('users')[i].A3389REGAS));
                                    arrayDataGrilla.push({
                                        A3389REGAS: String(item.record.get('users')[i].A3389REGAS),
                                        children: [
                                            {A3389RAUD: item.record.get('users')[i].A3389RAUD, A3389PAIS: item.record.get('users')[i].A3389PAIS , A3389CANTPRI: item.record.get('users')[i].A3389CANTPRI}
                                        ]

                                    });
                                } else {
                                    arrayDataGrilla[arraySearchGrilla.indexOf(String(item.record.get('users')[i].A3389REGAS))].children.push({A3389RAUD: item.record.get('users')[i].A3389RAUD, A3389PAIS: item.record.get('users')[i].A3389PAIS , A3389CANTPRI: item.record.get('users')[i].A3389CANTPRI});
                                }
                            }
                            var total = 0;
                            var parcial = 0;
                            var sinfo = 0;
                            var pais = '';
                            for (var i = 0; i < arrayDataGrilla.length; ++i) {
                                    total = 0;
                                    parcial = 0;
                                    sinfo = 0;
                                    pais='';
                                for (var vi = 0; vi < arrayDataGrilla[i].children.length; ++vi) {
                                    pais=arrayDataGrilla[i].children[vi].A3389PAIS; 
                                    if (arrayDataGrilla[i].children[vi].A3389RAUD === 'TOTAL') {
                                        total += parseFloat(arrayDataGrilla[i].children[vi].A3389CANTPRI);
                                    }
                                    if (arrayDataGrilla[i].children[vi].A3389RAUD === 'PARTIAL') {
                                        parcial += parseFloat(arrayDataGrilla[i].children[vi].A3389CANTPRI);
                                    }
                                    if (arrayDataGrilla[i].children[vi].A3389RAUD === 'NO INFORMATION') {
                                        sinfo += parseFloat(arrayDataGrilla[i].children[vi].A3389CANTPRI);
                                    }
                                }
                                arrayDataGraGrilla.push({A3389PAIS: pais, A3389REGAS: arrayDataGrilla[i].A3389REGAS, A3389TOTAL: total, A3389PARCIAL: parcial, A3389SINFO: sinfo, A3389TOTALRFND:(total+parcial+sinfo)});
                            }
                            store.loadData(arrayDataGraGrilla);
                        }
                    }
                }
            ],
            listeners: {
                afterrender: function (obj) {
                    panelCombina.updateLayout();
                }

            },
            tbar: [
                '->',
                {
                    xtype: 'button',
                    text: 'Download',
                    handler: function (btn, e, eOpts) {
                        btn.up('panel').down("cartesian").download({
                            filename: "Top ten countries highest refund applications"
                        });
                    }
                }
            ]
        });
        //A3389PAIS: "MX", A3389PARCIAL: 345, A3389TOTAL
        /*var chart = {
         xtype: 'cartesian',
         reference: 'chart',
         captions: {
         title: 'falta title'
         },
         store: arrayDataTemp,
         theme: 'Muted',
         width: 970,
         height: 360,
         //flipXY: true,
         animate: true,
         interactions: ['itemhighlight'],
         plugins: {
         chartitemevents: {
         moveEvents: true
         }
         },
         series: {
         type: 'bar3d',
         xField: 'A3389PAIS',
         yField: ['TOTAL', 'SININFO', 'PARCIAL'],
         title: ['TOTAL', 'SININFO', 'PARCIAL'],
         width: 140,
         height: 28,
         style: {
         maxBarWidth: 80
         },
         highlight: true,
         tooltip: {
         trackMouse: true,
         renderer: 'onTooltipRenderCombi'
         },
         label: {
         field: ['TOTAL', 'SININFO', 'PARCIAL'],
         display: 'insideEnd',
         orientation: 'horizontal'
         },
         listeners: {
         itemclick: function (series, item, event, eOpts) {
         var grid = Ext.getCmp(prototype.id + '-grid-detail');
         var store = grid.getStore();
         store.removeAll();
         store.loadData(item.record.get('users'));
         }
         }
         },
         legend: {
         docked: 'bottom'
         },
         axes: [
         {
         type: 'numeric3d',
         grid: true,
         position: 'left',
         renderer: 'onAxisLabelRender01',
         listeners: {
         rangechange: 'onAxisRangeChange'
         }
         }, {
         type: 'category3d',
         position: 'bottom',
         grid: true
         }
         ]
         };*/
        panelCombina.removeAll();
        panelCombina.add(chart);


    },
    onSeriesLabelRenderm_Combi: function (value) {
        var me = this;
        return Ext.util.Format.number(value, '0,000');
    },
    onTooltip3Render_Combi: function (tooltip, record, item) {
        var me = this;
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + Ext.util.Format.number(value, '0,000'));
    },
    onTooltipRenderCombi: function (tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    onAxisLabelRender01: function (axis, label, layoutContext) {
        return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
    },
    onAxisRangeChange: function (axis, range) {
        if (!range) {
            return;
        }

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

});

