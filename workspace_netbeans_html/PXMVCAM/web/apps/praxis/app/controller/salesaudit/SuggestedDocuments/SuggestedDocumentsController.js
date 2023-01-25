
Ext.define('Ext.Praxis.controller.salesaudit.SuggestedDocuments.SuggestedDocumentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SuggestedDocumentsController',
    /**
     * Constructor
     */
    beanGeneral: {},
    init: function(view) {
        var me = this;

    },
    OnBeforeShow: function() {
        prototype.id = 'SuggestedDocuments';
        prototype.id2 = 'DetailSuggestedDocuments';
        prototype.url = CONTEXTPATH + '/SuggestedDocuments';
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        this.setStoresFilters();
        this.setStoresGrids();
    },
    setStoresFilters: function() {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var CmbType = Ext.getCmp(prototype.id + '-CmbType');
        var cbmAuditor = Ext.getCmp(prototype.id + '-txtUser');
        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "2", "name": "PROCESSING DATE"}
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

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                 {"code": "RH", "name": "HISTORIC"},//
                {"code": "GN", "name": "PRESENT"}//present
               
            ]
        }));

        cbmAuditor.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BY", "name": "BY AUDITOR"},
                {"code": "XANGELICAC", "name": "XANGELICAC"},
                {"code": "XFMALAGON", "name": "XFMALAGON"},
                {"code": "XIALVARADO", "name": "XIALVARADO"},
                {"code": "XJGIL", "name": "XJGIL"},
                {"code": "XROSAC", "name": "XROSAC"},
                {"code": "XARACELIV", "name": "XARACELIV"}
            ]
        }));




    },
    onCmbSearchAfterRender: function(obj) {
        obj.setValue('');
    },
    onCmbCmbTypeAfterRender: function(obj) {
        obj.setValue('RH');
    },
    onCmbSearchChange: function(obj) {
        var gridReport = Ext.getCmp(prototype.id + '-gridReport');
        var gridReport2 = Ext.getCmp(prototype.id + '-gridReport2');
        
        if(obj.getValue() === "RH" ){
            gridReport.show();
            gridReport2.hide();
        }else{
            gridReport.hide();
            gridReport2.show();
        }
    },
    onCmbDateAfterRender: function(obj) {
        obj.setValue(new Date().getFullYear());
    },
    onCmbMonthAfterRender: function(obj) {
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
    setStoresGrids: function() {
        var grid01 = Ext.getCmp(prototype.id + '-gridReport');
        var grid02 = Ext.getCmp(prototype.id + '-gridReport2');
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
        //
        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportGeneral2/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        //
        grid01.setStore(store01);
        grid02.setStore(store02);
    },
    onSearchkey: function(f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    imgSearch_clickHandler: function(obj, e) {
        var fecha = new Date().getFullYear();
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var ComboSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var ComboType = Ext.getCmp(prototype.id + '-CmbType').getValue();


        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var txtAudit = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();

        if (ComboBy === '') {
            global.Msg({msg: 'SELECT Of By'});
            return;
        }
        if (txtFilterDateFrom == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date From", function(btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (txtFilterDateTo == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date To", function(btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }
        if (cmbDateFromMonth == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Month From", function(btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-cmbDateFromMonth').focus();", 100);
            });
            return;
        }
        if (cmbDateToMonth == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Month To", function(btn, text) {
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
        /* if (cmbDateFromMonth !== '' && cmbDateToMonth !== '') {
            if (txtFilterDateFrom === txtFilterDateTo && cmbDateToMonth < cmbDateFromMonth) {
                Ext.MessageBox.alert('PRAXIS', "The Month To must be greater than Month From.");
                return;
            }
        }*/
        
        /*parametros para realizar las consultas*/
        //primero
        this.beanGeneral.VP_STATUS = '';
        if (txtcountry !== '' && txtCurrency === ''  && txtAudit === '' && txtIATA === '') {
             this.beanGeneral.VP_STATUS = '1';
        }
        if (txtcountry !== '' && txtCurrency !== '' &&   txtAudit === '' && txtIATA === '') {
             this.beanGeneral.VP_STATUS = '2';
        }
        if (txtcountry !== '' && txtCurrency !== '' &&  txtAudit !== '' && txtIATA === '') {
             this.beanGeneral.VP_STATUS = '3';
        }
        if (txtcountry !== '' && txtCurrency !== '' &&  txtAudit !== '' && txtIATA !== '') {
             this.beanGeneral.VP_STATUS = '4';
        }
        if (txtcountry !== '' && txtCurrency !== '' &&  txtAudit === '' && txtIATA !== '') {
             this.beanGeneral.VP_STATUS = '5';
        }
        
        //segundo 
        if (txtcountry === '' && txtCurrency !== ''  && txtAudit === '' && txtIATA === '') {
             this.beanGeneral.VP_STATUS = '6';
        }
        if (txtcountry === '' && txtCurrency !== '' &&   txtAudit !== '' && txtIATA === '') {
             this.beanGeneral.VP_STATUS = '7';
        }
        if (txtcountry === '' && txtCurrency !== '' &&  txtAudit !== '' && txtIATA !== '') {
             this.beanGeneral.VP_STATUS = '8';
        }
        if (txtcountry !== '' && txtCurrency !== '' &&  txtAudit === '' && txtIATA !== '') {
             this.beanGeneral.VP_STATUS = '9';
        }
         //TERCERO 
        if (txtcountry === '' && txtCurrency === ''  && txtAudit !== '' && txtIATA === '') {
             this.beanGeneral.VP_STATUS = '10';
        }
        if (txtcountry === '' && txtCurrency === '' &&   txtAudit !== '' && txtIATA !== '') {
             this.beanGeneral.VP_STATUS = '11';
        }
       if (txtcountry !== '' && txtCurrency === '' &&  txtAudit === '' && txtIATA !== '') {
             this.beanGeneral.VP_STATUS = '12';
        }
         if (txtcountry === '' && txtCurrency !== '' &&  txtAudit === '' && txtIATA !== '') {
             this.beanGeneral.VP_STATUS = '13';
        }
        //CUARTO 
        if (txtcountry === '' && txtCurrency === ''  && txtAudit === '' && txtIATA !== '') {
             this.beanGeneral.VP_STATUS = '14';
        }
        
        /*de los parametrosd*/
        /* fin de la validaciones de la fech*/
        
            this.beanGeneral.VP_OPTION = ComboBy;
            this.beanGeneral.VP_DATEFROM = txtFilterDateFrom + '' + win.getMonthAbbreviation(cmbDateFromMonth);
            this.beanGeneral.VP_DATETO = txtFilterDateTo + '' + win.getMonthAbbreviation(cmbDateToMonth);
            this.beanGeneral.VP_COUNTRY = txtcountry;
            this.beanGeneral.VP_CUR = txtCurrency;
            this.beanGeneral.VP_USER = txtAudit;
            this.beanGeneral.VP_IATA = txtIATA;
            this.beanGeneral.VP_SOURCE = ComboSource;
        //SQP00989Filter
        this.SearchReportStatisGeneral(this.beanGeneral, obj === true ? obj : false,ComboType);
    },
    SearchReportStatisGeneral: function(bean, bExcel,ComboType) {
         var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            if(ComboType==='RH'){
                Ext.getCmp(prototype.id + '-gridReport').getStore().removeAll();
                Ext.getCmp(prototype.id + '-gridReport').getStore().loadPage(1, {
                    params: {
                        beanString: JSON.stringify(bean)

                    }, callback: function(records, operation, success) {
                        var Objtemp = records;
                            me.onCreateChart(Objtemp);
                        
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
            }else{
                
                Ext.getCmp(prototype.id + '-gridReport2').getStore().removeAll();
                Ext.getCmp(prototype.id + '-gridReport2').getStore().loadPage(1, {
                    params: {
                        beanString: JSON.stringify(bean)

                    }, callback: function(records, operation, success) {
                        var Objtemp = records;
                        me.onCreateChartReal(Objtemp);
                        //me.onCreateChart(Objtemp);
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
            
        }

    },
   onSeriesLabelRenderm: function(value) {
        return Ext.util.Format.number(value, '0,000');
    },
    onTooltip3Render: function(tooltip, record, item) {
        var formatString = '0,000',
                fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
                sector = item.series.getTitle()[fieldIndex],
                value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    onCreateChartReal: function(Objtemp) {
        //primer grafico
            var panel = Ext.getCmp(prototype.id + '-chart');
            var lstNewList = new Array();
            for (var i = 0; i < Objtemp.length; i++) {
                 var beanList = new Array(); //Objtemp[i].data;
                    beanList.A1672FPROC = Objtemp[i].data.A1672FPROC;
                    beanList.SUGGESTQTY = Objtemp[i].data.SUGGESTQTY;
                    beanList.ACCEPTQTY = Objtemp[i].data.ACCEPTQTY;
                    beanList.PEDIENTEQTY = Objtemp[i].data.PEDIENTEQTY;
                    beanList.REAUTQTY = Objtemp[i].data.REAUTQTY;
                    beanList.REJETQTY = Objtemp[i].data.REJETQTY;
                    beanList.JUSTIQTY = Objtemp[i].data.JUSTIQTY;
                    beanList.AUTHOQTY = Objtemp[i].data.AUTHOQTY;
                    lstNewList.push(beanList);                    
            }
            var arraySearch = [];
            var arrayData = [];
            var arrayDataGra = [];
             for (var i = 0; i < lstNewList.length; ++i) {
                 if (arraySearch.indexOf(String(lstNewList[i].A1672FPROC).substr(0, 4)) < 0) {
                        arraySearch.push(String(lstNewList[i].A1672FPROC).substr(0, 4));
                        arrayData.push({
                            A1672FPROC: String(lstNewList[i].A1672FPROC).substr(0, 4),
                            children: [{SUGGESTQTY: lstNewList[i].SUGGESTQTY,ACCEPTQTY: lstNewList[i].ACCEPTQTY,PEDIENTEQTY: lstNewList[i].PEDIENTEQTY, REAUTQTY: lstNewList[i].REAUTQTY,REJETQTY: lstNewList[i].REJETQTY,JUSTIQTY: lstNewList[i].JUSTIQTY,AUTHOQTY: lstNewList[i].AUTHOQTY}]

                        });
                 } else {
                     arrayData[arraySearch.indexOf(String(lstNewList[i].A1672FPROC).substr(0, 4))].children.push({SUGGESTQTY: lstNewList[i].SUGGESTQTY,ACCEPTQTY: lstNewList[i].ACCEPTQTY,PEDIENTEQTY: lstNewList[i].PEDIENTEQTY, REAUTQTY: lstNewList[i].REAUTQTY,REJETQTY: lstNewList[i].REJETQTY,JUSTIQTY: lstNewList[i].JUSTIQTY,AUTHOQTY: lstNewList[i].AUTHOQTY});
                 }
             }
             var SUGGESTQTY = 0;
             var ACCEPTQTY = 0;
             var PEDIENTEQTY = 0;
             var REAUTQTY = 0;
             var REJETQTY = 0;
             var JUSTIQTY =0;
             var AUTHOQTY =0;             
             
            for (var i = 0; i < arrayData.length; ++i) {
                SUGGESTQTY = 0;
                ACCEPTQTY = 0;
                REAUTQTY = 0;
                REJETQTY = 0;
                JUSTIQTY = 0;
                AUTHOQTY =0;
                PEDIENTEQTY=0;
                for (var vi = 0; vi < arrayData[i].children.length; ++vi) {
                    SUGGESTQTY += parseFloat(arrayData[i].children[vi].SUGGESTQTY);
                    ACCEPTQTY += parseFloat(arrayData[i].children[vi].ACCEPTQTY);
                    REAUTQTY += parseFloat(arrayData[i].children[vi].REAUTQTY);
                    REJETQTY += parseFloat(arrayData[i].children[vi].REJETQTY);
                    JUSTIQTY += parseFloat(arrayData[i].children[vi].JUSTIQTY);
                    AUTHOQTY += parseFloat(arrayData[i].children[vi].AUTHOQTY);
                    PEDIENTEQTY += parseFloat(arrayData[i].children[vi].PEDIENTEQTY);
                }
                arrayDataGra.push({anio: arrayData[i].A1672FPROC, Suggested: SUGGESTQTY, Accepted: ACCEPTQTY, Reaudited: REAUTQTY, Rejected:REJETQTY,Justified:JUSTIQTY,Authorized:AUTHOQTY,Grouping:PEDIENTEQTY});

            }
            var store04 = Ext.create('Ext.data.Store', {
                        fields: ['anio', 'Accepted','Suggested', 'Reaudited','Rejected','Justified','Authorized','Grouping'],
                        data: arrayDataGra

            });
            var chart01 = Ext.create('Ext.panel.Panel', {
                    id: prototype.id + '-graficosAños',
                     
                    items: [
                        {
                            xtype: 'cartesian',
                           width: '100%',
                            height: 400,
                             insetPadding: '10 40 0 10',
                            autoScroll: true,
                            captions: {
                                title: {
                                    text: 'Suggested documents present',
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
                                    fields: ['Accepted','Suggested', 'Reaudited','Rejected','Justified','Authorized','Grouping'],
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
                                        translationX: - 30
                                    },
                                    grid: true
                                }
                            ],
                            series: {
                                type: 'bar3d',
                                stacked: false,
                                title: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                xField: 'anio',
                                yField: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                label: {
                                    field: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                    display: 'insideEnd',
                                    renderer: 'onSeriesLabelRenderm'
                                },
                               /* type: 'bar3d',
                                stacked: false,
                                title: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                xField: 'anio',
                                yField: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                label: {
                                    field: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                    display: 'outside',orientation:'horizontal',
                                   // renderer: 'onSeriesLabelRender'
                                   renderer: 'onSeriesLabelRender'
                                },*/
                                highlight: true,
                                style: {
                                    inGroupGapWidth: - 7
                                },
                                tooltip: {
                                    trackMouse: true,
                                    renderer: 'onTooltip3Render'
                                }
                            }
                        }
                    ],
                    listeners:{ 
                        afterrender:function(obj){
                            panel.updateLayout();
                        }
                    },
                    tbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Download',
                            handler: function(btn, e, eOpts) {
                                btn.up('panel').down("cartesian").download({
                                    filename: "Suggested documents present Years"
                                });
                            }
                        }
                    ]
                });
                panel.add(chart01);
        //fin del segundo grafico
        //ini segundo grafico
            var pane2 = Ext.getCmp(prototype.id + '-chart2');
            var VL_SUGGESTQTY = 0; var VL_ACCEPTQTY =0; var VL_REAUTQTY=0; var VL_REJETQTY=0;
            var VL_JUSTIQTY = 0; var VL_AUTHOQTY =0; var VL_TOTAL=0; var VL_PEDIENTEQTY=0; var VL_CLIENTEPORC=0; var VL_DESHABIQTY=0;
            for (var i = 0; i < Objtemp.length; i++) {

                VL_SUGGESTQTY+= parseFloat(Objtemp[i].data.SUGGESTQTY);
                VL_ACCEPTQTY+= parseFloat(Objtemp[i].data.ACCEPTQTY);
                VL_REAUTQTY+= parseFloat(Objtemp[i].data.REAUTQTY);
                VL_REJETQTY+= parseFloat(Objtemp[i].data.REJETQTY);
                VL_JUSTIQTY+= parseFloat(Objtemp[i].data.JUSTIQTY);
                VL_AUTHOQTY+= parseFloat(Objtemp[i].data.AUTHOQTY);
                VL_PEDIENTEQTY+=parseFloat(Objtemp[i].data.PEDIENTEQTY);
                VL_CLIENTEPORC+=parseFloat(Objtemp[i].data.CLIENTEPORC);
                VL_DESHABIQTY+=parseFloat(Objtemp[i].data.DESHABIQTY);
                VL_TOTAL+= parseFloat(Objtemp[i].data.TOTAL);
            }
            VL_SUGGESTQTY  = win.formatLngNumber((( VL_SUGGESTQTY * 100) / VL_TOTAL));
            VL_ACCEPTQTY  = win.formatLngNumber(((VL_ACCEPTQTY * 100) / VL_TOTAL));
            VL_REAUTQTY  = win.formatLngNumber(((VL_REAUTQTY * 100) / VL_TOTAL));
            VL_REJETQTY  = win.formatLngNumber(((VL_REJETQTY * 100) / VL_TOTAL));
            VL_JUSTIQTY  = win.formatLngNumber(((VL_JUSTIQTY * 100) / VL_TOTAL));
            VL_AUTHOQTY  = win.formatLngNumber(((VL_AUTHOQTY * 100) / VL_TOTAL));
            VL_PEDIENTEQTY  = win.formatLngNumber(((VL_PEDIENTEQTY * 100) / VL_TOTAL));
            VL_CLIENTEPORC  = win.formatLngNumber(((VL_CLIENTEPORC * 100) / VL_TOTAL));
            VL_DESHABIQTY  = win.formatLngNumber(((VL_DESHABIQTY * 100) / VL_TOTAL));
            var store03 = Ext.create('Ext.data.Store', {
                fields: ['os', 'data1' ],
                        data: [
                        { os: 'Accepted', data1: VL_ACCEPTQTY,label: VL_ACCEPTQTY +'%' },
                        { os: 'Suggested', data1: VL_SUGGESTQTY,label: VL_SUGGESTQTY +'%' },
                        { os: 'Rejected', data1: VL_REJETQTY,label: VL_REJETQTY +'%' },
                        { os: 'Reaudited', data1: VL_REAUTQTY,label: VL_REAUTQTY +'%' },
                        { os: 'Justified', data1: VL_JUSTIQTY,label: VL_JUSTIQTY +'%' },
                        { os: 'Authorized', data1: VL_AUTHOQTY,label: VL_AUTHOQTY +'%' },
                        { os: 'Disabled', data1: VL_DESHABIQTY,label: VL_DESHABIQTY +'%' },
                        { os: 'Unregistered', data1: VL_CLIENTEPORC,label: VL_CLIENTEPORC +'%' },
                        { os: 'Grouping', data1: VL_PEDIENTEQTY,label: VL_PEDIENTEQTY +'%' }
                        
                        ]
                });
             var chart03 = Ext.create('Ext.panel.Panel', {
                      id: prototype.id + '-graficoschart',
                    items:[
                        {
                            xtype: 'polar',
                            height: 380,
                            captions: {
                                title: 'Suggested documents present %'
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
                                        filename: "Suggested documents present Years %"
                                    });
                                }
                            }
                        ]
                    });
                    pane2.add(chart03);
        //fin del segundo grafico
         //tercer grafico por mes
            var panel3 = Ext.getCmp(prototype.id + '-chart3');
            var arraySearchMonth = [];
            var arrayDataMonth = [];
            var arrayDataGraMonth = [];
            for (var i = 0; i < lstNewList.length; ++i) {
                if (arraySearchMonth.indexOf(String(lstNewList[i].A1672FPROC)) < 0) {
                       arraySearchMonth.push(String(lstNewList[i].A1672FPROC));
                       arrayDataMonth.push({
                           A1672FPROC: String(lstNewList[i].A1672FPROC),
                           children: [{SUGGESTQTY: lstNewList[i].SUGGESTQTY,ACCEPTQTY: lstNewList[i].ACCEPTQTY,PEDIENTEQTY: lstNewList[i].PEDIENTEQTY, REAUTQTY: lstNewList[i].REAUTQTY,REJETQTY: lstNewList[i].REJETQTY,JUSTIQTY: lstNewList[i].JUSTIQTY,AUTHOQTY: lstNewList[i].AUTHOQTY}]

                       });
                } else {
                    arrayDataMonth[arraySearchMonth.indexOf(String(lstNewList[i].A1672FPROC))].children.push({SUGGESTQTY: lstNewList[i].SUGGESTQTY,ACCEPTQTY: lstNewList[i].ACCEPTQTY,PEDIENTEQTY: lstNewList[i].PEDIENTEQTY, REAUTQTY: lstNewList[i].REAUTQTY,REJETQTY: lstNewList[i].REJETQTY,JUSTIQTY: lstNewList[i].JUSTIQTY,AUTHOQTY: lstNewList[i].AUTHOQTY});
                }
            }
            var SUGGESTQTY = 0;var ACCEPTQTY = 0;var PEDIENTEQTY = 0;var REAUTQTY = 0;var REJETQTY = 0;var JUSTIQTY =0;var AUTHOQTY =0; var PEDIENTEQTY=0;
            for (var i = 0; i < arrayDataMonth.length; ++i) {
            SUGGESTQTY = 0;
            ACCEPTQTY = 0;
            REAUTQTY = 0;
            REJETQTY = 0;
            JUSTIQTY = 0;
            AUTHOQTY =0;
            PEDIENTEQTY=0;
            for (var vi = 0; vi < arrayDataMonth[i].children.length; ++vi) {
                SUGGESTQTY += parseFloat(arrayDataMonth[i].children[vi].SUGGESTQTY);
                ACCEPTQTY += parseFloat(arrayDataMonth[i].children[vi].ACCEPTQTY);
                REAUTQTY += parseFloat(arrayDataMonth[i].children[vi].REAUTQTY);
                REJETQTY += parseFloat(arrayDataMonth[i].children[vi].REJETQTY);
                JUSTIQTY += parseFloat(arrayDataMonth[i].children[vi].JUSTIQTY);
                AUTHOQTY += parseFloat(arrayDataMonth[i].children[vi].AUTHOQTY);
                PEDIENTEQTY += parseFloat(arrayDataMonth[i].children[vi].PEDIENTEQTY);
            }
            arrayDataGraMonth.push({anio: arrayDataMonth[i].A1672FPROC, Suggested: SUGGESTQTY, Accepted: ACCEPTQTY, Reaudited: REAUTQTY, Rejected:REJETQTY,Justified:JUSTIQTY,Authorized:AUTHOQTY,Grouping:PEDIENTEQTY});

        }
        var storeMonth = Ext.create('Ext.data.Store', {
                    fields: ['anio', 'Accepted','Suggested', 'Reaudited','Rejected','Justified','Authorized','Grouping'],
                    data: arrayDataGraMonth

            });
          var chart03 = Ext.create('Ext.panel.Panel', {
                    id: prototype.id + '-graficosmonthDe',
                     
                    items: [
                        {
                            xtype: 'cartesian',
                           width: '100%',
                            height: 400,
                             insetPadding: '10 40 0 10',
                            autoScroll: true,
                            captions: {
                                title: {
                                    text: 'Suggested documents present',
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
                            store: storeMonth,
                            legend: {
                                type: 'dom',
                                docked: 'bottom'
                            },
                            axes: [
                                {
                                    type: 'numeric3d',
                                    position: 'left',
                                    fields: ['Accepted','Suggested', 'Reaudited','Rejected','Justified','Authorized','Grouping'],
                                    grid: true//,
                                    //title: 'Sales in USD',
                                    // renderer: 'onAxisLabelRender'
                                }, 
                                {
                                    type: 'category3d',
                                    position: 'bottom',
                                    fields: 'anio',
                                    title: {
                                        text: 'Months',
                                        translationX: - 30
                                    },
                                    grid: true
                                }
                            ],
                            series: {
                                type: 'bar3d',
                                stacked: false,
                                title: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                xField: 'anio',
                                yField: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                          
                               label: {
                                    field: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                    display: 'insideEnd',
                                    renderer: 'onSeriesLabelRenderm'
                                },
                                    //field: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                   // display: 'outside',orientation:'horizontal',
                                   // renderer: 'onSeriesLabelRender'
                                   //renderer: 'onSeriesLabelRender'
                                highlight: true,
                                style: {
                                    inGroupGapWidth: - 7
                                },
                                tooltip: {
                                    trackMouse: true,
                                    renderer: 'onTooltip3Render'
                                }
                            }
                        }
                    ],
                    listeners:{ 
                        afterrender:function(obj){
                            panel.updateLayout();
                        }
                    },
                    tbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Download',
                            handler: function(btn, e, eOpts) {
                                btn.up('panel').down("cartesian").download({
                                    filename: "Suggested documents present Years"
                                });
                            }
                        }
                    ]
                });
                panel3.add(chart03); 
          //fin del tercer grafico
          //grafico cuarto
            var panel4 = Ext.getCmp(prototype.id + '-chart4');
            var lstcombination = new Array();
                for (var i = 0; i < Objtemp.length; i++) {
                     var beanList = new Array(); //Objtemp[i].data;
                         beanList.A1672FPROC = Objtemp[i].data.A1672FUENT;//Objtemp[i].data.A1672FPROC +""+Objtemp[i].data.A1672FUENT;
                         beanList.SUGGESTQTY = Objtemp[i].data.SUGGESTQTY;
                         beanList.ACCEPTQTY = Objtemp[i].data.ACCEPTQTY;
                         beanList.REAUTQTY = Objtemp[i].data.REAUTQTY;
                         beanList.REJETQTY = Objtemp[i].data.REJETQTY;
                         beanList.JUSTIQTY = Objtemp[i].data.JUSTIQTY;
                         beanList.AUTHOQTY = Objtemp[i].data.AUTHOQTY;
                         beanList.TOTAL = Objtemp[i].data.TOTAL;
                         lstcombination.push(beanList);
                 }
                var arraycombination = [];
                var arrayDatacombination = [];
                var arrayDataGracombination = [];
                 for (var i = 0; i < lstcombination.length; ++i) {
                     if (arraycombination.indexOf(String(lstcombination[i].A1672FPROC)) < 0) {
                            arraycombination.push(String(lstcombination[i].A1672FPROC));
                            arrayDatacombination.push({
                                A1672FPROC: String(lstcombination[i].A1672FPROC),
                                children: [{SUGGESTQTY: lstcombination[i].SUGGESTQTY, ACCEPTQTY: lstcombination[i].ACCEPTQTY, REAUTQTY: lstcombination[i].REAUTQTY,REJETQTY: lstcombination[i].REJETQTY,JUSTIQTY: lstcombination[i].JUSTIQTY,AUTHOQTY: lstcombination[i].AUTHOQTY}]

                            });
                     } else {
                         arrayDatacombination[arraycombination.indexOf(String(lstcombination[i].A1672FPROC))].children.push({SUGGESTQTY: lstcombination[i].SUGGESTQTY, ACCEPTQTY: lstcombination[i].ACCEPTQTY, REAUTQTY: lstcombination[i].REAUTQTY,REJETQTY: lstcombination[i].REJETQTY,JUSTIQTY: lstcombination[i].JUSTIQTY,AUTHOQTY: lstcombination[i].AUTHOQTY});
                     }
                 }
           
           
         var SUGGESTQTY = 0;var ACCEPTQTY = 0;var REAUTQTY = 0;var REJETQTY = 0;var JUSTIQTY = 0; var AUTHOQTY =0; var TOTAL=0;
        for (var i = 0; i < arrayDatacombination.length; ++i) {
            SUGGESTQTY = 0;ACCEPTQTY = 0;REAUTQTY = 0;REJETQTY = 0;JUSTIQTY = 0;AUTHOQTY =0;TOTAL=0;
            for (var vi = 0; vi < arrayDatacombination[i].children.length; ++vi) {
                SUGGESTQTY += parseFloat(arrayDatacombination[i].children[vi].SUGGESTQTY);
                ACCEPTQTY += parseFloat(arrayDatacombination[i].children[vi].ACCEPTQTY);
                REAUTQTY += parseFloat(arrayDatacombination[i].children[vi].REAUTQTY);
                REJETQTY += parseFloat(arrayDatacombination[i].children[vi].REJETQTY);
                JUSTIQTY += parseFloat(arrayDatacombination[i].children[vi].JUSTIQTY);
                AUTHOQTY += parseFloat(arrayDatacombination[i].children[vi].AUTHOQTY);
            }
            arrayDataGracombination.push({anio: arrayDatacombination[i].A1672FPROC, Suggested: SUGGESTQTY, Accepted: ACCEPTQTY, Reaudited: REAUTQTY, Rejected:REJETQTY,Justified:JUSTIQTY,Authorized:AUTHOQTY});

        }
               
                var store4 = Ext.create('Ext.data.Store', {
                     // IE    Firefox  Chrome   Safari
                        fields: ['anio', 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                        data: arrayDataGracombination
                });
                var chart04 = Ext.create('Ext.panel.Panel', {
                    id: prototype.id + '-graficosStacked',
                     
                    items: [
                        {
                            xtype: 'cartesian',
                           width: '100%',
                            height: 400,
                             insetPadding: '10 40 0 10',
                            autoScroll: true,
                            captions: {
                                title: {
                                    text: 'Suggested documents present',
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
                            store: store4,
                            legend: {
                                type: 'dom',
                                docked: 'bottom'
                            },
                            axes: [
                                {
                                    type: 'numeric3d',
                                    position: 'left',
                                    fields: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                                    grid: true//,
                                    //title: 'Sales in USD',
                                    // renderer: 'onAxisLabelRender'
                                }, 
                                {
                                    type: 'category3d',
                                    position: 'bottom',
                                    fields: 'anio',
                                    title: {
                                        text: 'Months',
                                        translationX: - 30
                                    },
                                    grid: true
                                }
                            ],
                            series: {
                                type: 'bar3d',
                                stacked: false,
                               title: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                                xField: 'anio',
                                yField: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                          
                               label: {
                                    field: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                                    display: 'insideEnd',
                                    renderer: 'onSeriesLabelRenderm'
                                },
                                    //field: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                   // display: 'outside',orientation:'horizontal',
                                   // renderer: 'onSeriesLabelRender'
                                   //renderer: 'onSeriesLabelRender'
                                highlight: true,
                                style: {
                                    inGroupGapWidth: - 7
                                },
                                tooltip: {
                                    trackMouse: true,
                                    renderer: 'onTooltip3Render'
                                }
                            }
                        }
                    ],
                    listeners:{ 
                        afterrender:function(obj){
                            panel4.updateLayout();
                        }
                    },
                    tbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Download',
                            handler: function(btn, e, eOpts) {
                                btn.up('panel').down("cartesian").download({
                                    filename: "Suggested documents present Years"
                                });
                            }
                        }
                    ]
                });
                panel4.add(chart04); 
                /*var chart04 = Ext.create('Ext.panel.Panel', {
                    id: prototype.id + '-graficosStacked',
                     
                    items: [{
                            xtype: 'cartesian',
                            reference: 'chart',
                            captions: {
                                title: 'Suggested documents present'
                            },
                            store: store4,
                            theme: 'Muted',
                            width: '100%',
                            height: 400,
                            interactions: ['itemhighlight'],
                            series: {
                                    type: 'bar',
                                    fullStack: true,
                                    title: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                                    xField: 'month',
                                    yField: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                                    stacked: true,
                                    style: {
                                        opacity: 0.80
                                    },
                                    highlightCfg: {
                                        opacity: 1,
                                        strokeStyle: 'black'
                                    },
                                    tooltip: {
                                        trackMouse: true,
                                        renderer: 'onSeriesTooltipRender'
                                    }
                                },
                            legend: {
                                docked: 'bottom'
                            },
                            axes:  [{
                                        type: 'numeric',
                                        position: 'left',
                                        grid: true,
                                        fields: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                                        label: {
                                            renderer: 'onAxisLabelRender'
                                        },
                                        minimum: 0,
                                        maximum: 100
                                    }, 
                                    {
                                        type: 'category',
                                        position: 'bottom',
                                        grid: true,
                                        fields: ['month'],
                                        label: {
                                            rotate: {
                                                degrees: -45
                                            }
                                        }
                                    }]
                        }],
                    listeners:{ 
                        afterrender:function(obj){
                            panel4.updateLayout();
                        }
                    },
                    tbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Download',
                            handler: function(btn, e, eOpts) {
                                btn.up('panel').down("cartesian").download({
                                    filename: "Suggested documents present Years"
                                });
                            }
                        }
                    ]
                });
                panel4.add(chart04); */
          //fin grafico cuarto
          //Ultimo grafiso de usuarios
          //Graficos por usuario
       if(Ext.getCmp(prototype.id + '-txtUser').getValue()!==''){
           Ext.getCmp(prototype.id + '-graficosUser').setDisabled(false);
           // 
            var panel5 = Ext.getCmp(prototype.id + '-chart5');
            var lstnewUser = new Array();
            for (var i = 0; i < Objtemp.length; i++) {
                 var beanUser = new Array(); //Objtemp[i].data;
                     beanUser.A1672FPROC = Objtemp[i].data.A1672REVIS;
                     beanUser.SUGGESTQTY = Objtemp[i].data.SUGGESTQTY;
                     beanUser.ACCEPTQTY = Objtemp[i].data.ACCEPTQTY;
                     beanUser.REAUTQTY = Objtemp[i].data.REAUTQTY;
                     beanUser.REJETQTY = Objtemp[i].data.REJETQTY;
                     beanUser.JUSTIQTY = Objtemp[i].data.JUSTIQTY;
                     beanUser.AUTHOQTY = Objtemp[i].data.AUTHOQTY;
                     beanUser.PEDIENTEQTY = Objtemp[i].data.PEDIENTEQTY;
                     beanUser.DESHABIQTY = Objtemp[i].data.DESHABIQTY;
                     beanUser.CLIENTEPORC = Objtemp[i].data.CLIENTEPORC;
                     lstnewUser.push(beanUser);//
             }
             var arrayUser = [];
             var arrayDataUser = [];
             var arrayDataGraUser = [];
             for (var i = 0; i < lstnewUser.length; ++i) {
                 if (arrayUser.indexOf(String(lstnewUser[i].A1672FPROC)) < 0) {
                        arrayUser.push(String(lstnewUser[i].A1672FPROC));
                            arrayDataUser.push({
                                A1672FPROC: String(lstnewUser[i].A1672FPROC),
                                children: [{SUGGESTQTY: lstnewUser[i].SUGGESTQTY, ACCEPTQTY: lstnewUser[i].ACCEPTQTY, REAUTQTY: lstnewUser[i].REAUTQTY,REJETQTY: lstnewUser[i].REJETQTY,JUSTIQTY: lstnewUser[i].JUSTIQTY,AUTHOQTY: lstnewUser[i].AUTHOQTY,PEDIENTEQTY: lstnewUser[i].PEDIENTEQTY,DESHABIQTY: lstnewUser[i].DESHABIQTY,CLIENTEPORC: lstnewUser[i].CLIENTEPORC}]

                            });
                 } else {
                         arrayDataUser[arrayUser.indexOf(String(lstnewUser[i].A1672FPROC))].children.push({SUGGESTQTY: lstnewUser[i].SUGGESTQTY, ACCEPTQTY: lstnewUser[i].ACCEPTQTY, REAUTQTY: lstnewUser[i].REAUTQTY,REJETQTY: lstnewUser[i].REJETQTY,JUSTIQTY: lstnewUser[i].JUSTIQTY,AUTHOQTY: lstnewUser[i].AUTHOQTY,PEDIENTEQTY: lstnewUser[i].PEDIENTEQTY,DESHABIQTY: lstnewUser[i].DESHABIQTY,CLIENTEPORC: lstnewUser[i].CLIENTEPORC});
                     }
             }
             var SUGGESTQTY = 0;var ACCEPTQTY = 0;var REAUTQTY = 0;var REJETQTY = 0;var JUSTIQTY = 0; var AUTHOQTY =0; var PEDIENTEQTY=0; var DESHABIQTY=0; var CLIENTEPORC=0;
             
             for (var i = 0; i < arrayDataUser.length; ++i) {
                 SUGGESTQTY = 0;ACCEPTQTY = 0;REAUTQTY = 0;REJETQTY = 0;JUSTIQTY = 0;AUTHOQTY =0;
                for (var vi = 0; vi < arrayDataUser[i].children.length; ++vi) {
                    SUGGESTQTY += parseFloat(arrayDataUser[i].children[vi].SUGGESTQTY);
                    ACCEPTQTY += parseFloat(arrayDataUser[i].children[vi].ACCEPTQTY);
                    REAUTQTY += parseFloat(arrayDataUser[i].children[vi].REAUTQTY);
                    REJETQTY += parseFloat(arrayDataUser[i].children[vi].REJETQTY);
                    JUSTIQTY += parseFloat(arrayDataUser[i].children[vi].JUSTIQTY);
                    AUTHOQTY += parseFloat(arrayDataUser[i].children[vi].AUTHOQTY);
                    PEDIENTEQTY += parseFloat(arrayDataUser[i].children[vi].PEDIENTEQTY);
                    DESHABIQTY += parseFloat(arrayDataUser[i].children[vi].DESHABIQTY);
                    CLIENTEPORC += parseFloat(arrayDataUser[i].children[vi].CLIENTEPORC);
                }
                arrayDataGraUser.push({anio: arrayDataUser[i].A1672FPROC, Suggested: SUGGESTQTY, Accepted: ACCEPTQTY, Reaudited: REAUTQTY, Rejected:REJETQTY,Justified:JUSTIQTY,Authorized:AUTHOQTY});
             }
             
           var store5 = Ext.create('Ext.data.Store', {
                    fields: ['anio','Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                    data: arrayDataGraUser
                       });
             //console.log(arrayDataGraUser);
           var chart05 = Ext.create('Ext.panel.Panel', {
                    id: prototype.id + '-graficosUserPrin',                     
                    items: [
                        {
                            xtype: 'cartesian',
                           width: '100%',
                            height: 400,
                             insetPadding: '10 40 0 10',
                            autoScroll: true,
                            captions: {
                                title: {
                                    text: 'Suggested documents present',
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
                                    fields: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping' ],
                                    grid: true//,
                                    //title: 'Sales in USD',
                                    // renderer: 'onAxisLabelRender'
                                }, 
                                {
                                    type: 'category3d',
                                    position: 'bottom',
                                    fields: 'anio',
                                    title: {
                                        text: 'Months',
                                        translationX: - 30
                                    },
                                    grid: true
                                }
                            ],
                            series: {
                                type: 'bar3d',
                                stacked: false,
                               title: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping' ],
                                xField: 'anio',
                                yField: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping' ],
                          
                               label: {
                                    field: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping' ],
                                    display: 'insideEnd',
                                    renderer: 'onSeriesLabelRenderm'
                                },
                                    //field: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                   // display: 'outside',orientation:'horizontal',
                                   // renderer: 'onSeriesLabelRender'
                                   //renderer: 'onSeriesLabelRender'
                                highlight: true,
                                style: {
                                    inGroupGapWidth: - 7
                                },
                                tooltip: {
                                    trackMouse: true,
                                    renderer: 'onTooltip3Render'
                                }
                            }
                        }
                    ],
                    listeners:{ 
                        afterrender:function(obj){
                            panel5.updateLayout();
                        }
                    },
                    tbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Download',
                            handler: function(btn, e, eOpts) {
                                btn.up('panel').down("cartesian").download({
                                    filename: "Suggested documents present Years"
                                });
                            }
                        }
                    ]
                });
                panel5.add(chart05);              
         /* var chart05 = Ext.create('Ext.panel.Panel', {
                        id: prototype.id + '-graficosUserPrin',
                        items: [{
                                xtype: 'cartesian',
                                reference: 'chart',
                                captions: {
                                    title: 'Suggested documents present'
                                },
                                store: store5,
                                theme: 'Muted',
                                width: '100%',
                                height: 400,
                                interactions: ['itemhighlight'],
                                series: {
                                    type: 'bar3d',
                                    xField: 'country',
                                    yField: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                    title: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized','Grouping'],
                                    style: {
                                        maxBarWidth: 80
                                    },
                                    highlight: true,
                                    grid: true,
                                    tooltip: {
                                        trackMouse: true,
                                        renderer: 'onTooltipRender'
                                    }
                                },
                                legend: {
                                    docked: 'bottom'
                                },
                                axes: [{
                                    type: 'numeric3d',
                                    position: 'left',
                                    grid: {
                                        odd: {
                                            fillStyle: 'rgba(255, 255, 255, 0.06)'
                                        },
                                        even: {
                                            fillStyle: 'rgba(0, 0, 0, 0.03)'
                                        }
                                    },
                                    //title: 'Billions of USD',
                                    renderer: 'onAxisLabel5Render',
                                    listeners: {
                                        rangechange: 'onAxisRangeChange'
                                    }
                                }, {
                                    type: 'category3d',
                                    position: 'bottom',
                                    grid: true
                                }]
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
                            }],
                        listeners:{ 
                            afterrender:function(obj){
                                panel5.updateLayout();
                            }
                        },
                        tbar: [
                            {
                                xtype: 'segmentedbutton',
                                width: 200,
                                items: [{
                                    text: 'Stack',
                                    pressed: true
                                }, {
                                    text: 'Group'
                                }],
                                listeners: {
                                    toggle: 'onStackedToggle'
                                }
                            },
                            '->',
                            {
                                xtype: 'button',
                                text: 'Download',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("cartesian").download({
                                        filename: "Suggested documents present"
                                    });
                                }
                            }
                        ]
                    });
                    panel5.add(chart05);*/
           
       }else{
            Ext.getCmp(prototype.id + '-graficosUser').setDisabled(true);
       }
          //fin del ultimo grafico
        
    },
        
    onCreateChart: function(Objtemp) {
       var panel = Ext.getCmp(prototype.id + '-chart');
       //primer grafico
       var lstNewList = new Array();
       for (var i = 0; i < Objtemp.length; i++) {
            var beanList = new Array(); //Objtemp[i].data;
                beanList.A1672FPROC = Objtemp[i].data.A1672FPROC;
                beanList.SUGGESTQTY = Objtemp[i].data.SUGGESTQTY;
                beanList.ACCEPTQTY = Objtemp[i].data.ACCEPTQTY;
                beanList.REAUTQTY = Objtemp[i].data.REAUTQTY;
                beanList.REJETQTY = Objtemp[i].data.REJETQTY;
                beanList.JUSTIQTY = Objtemp[i].data.JUSTIQTY;
                beanList.AUTHOQTY = Objtemp[i].data.AUTHOQTY;
                beanList.A1672FUENT = Objtemp[i].data.A1672FUENT;
                lstNewList.push(beanList);
        }
        var arraySearch = [];
        var arrayData = [];
        var arrayDataGra = [];
         for (var i = 0; i < lstNewList.length; ++i) {
             if (arraySearch.indexOf(String(lstNewList[i].A1672FPROC).substr(0, 4)) < 0) {
                    arraySearch.push(String(lstNewList[i].A1672FPROC).substr(0, 4));
                    arrayData.push({
                        A1672FPROC: String(lstNewList[i].A1672FPROC).substr(0, 4),
                        children: [{SUGGESTQTY: lstNewList[i].SUGGESTQTY, ACCEPTQTY: lstNewList[i].ACCEPTQTY, REAUTQTY: lstNewList[i].REAUTQTY,REJETQTY: lstNewList[i].REJETQTY,JUSTIQTY: lstNewList[i].JUSTIQTY,AUTHOQTY: lstNewList[i].AUTHOQTY}]

                    });
             } else {
                 arrayData[arraySearch.indexOf(String(lstNewList[i].A1672FPROC).substr(0, 4))].children.push({SUGGESTQTY: lstNewList[i].SUGGESTQTY, ACCEPTQTY: lstNewList[i].ACCEPTQTY, REAUTQTY: lstNewList[i].REAUTQTY,REJETQTY: lstNewList[i].REJETQTY,JUSTIQTY: lstNewList[i].JUSTIQTY,AUTHOQTY: lstNewList[i].AUTHOQTY});
             }
         }
         var SUGGESTQTY = 0;
         var ACCEPTQTY = 0;
         var REAUTQTY = 0;
         var REJETQTY = 0;
         var JUSTIQTY = 0;
         var AUTHOQTY =0;
        for (var i = 0; i < arrayData.length; ++i) {
            SUGGESTQTY = 0;
            ACCEPTQTY = 0;
            REAUTQTY = 0;
            REJETQTY = 0;
            JUSTIQTY = 0;
            AUTHOQTY =0;
            for (var vi = 0; vi < arrayData[i].children.length; ++vi) {
                SUGGESTQTY += parseFloat(arrayData[i].children[vi].SUGGESTQTY);
                ACCEPTQTY += parseFloat(arrayData[i].children[vi].ACCEPTQTY);
                REAUTQTY += parseFloat(arrayData[i].children[vi].REAUTQTY);
                REJETQTY += parseFloat(arrayData[i].children[vi].REJETQTY);
                JUSTIQTY += parseFloat(arrayData[i].children[vi].JUSTIQTY);
                AUTHOQTY += parseFloat(arrayData[i].children[vi].AUTHOQTY);
            }
            arrayDataGra.push({anio: arrayData[i].A1672FPROC, Suggested: SUGGESTQTY, Accepted: ACCEPTQTY, Reaudited: REAUTQTY, Rejected:REJETQTY,Justified:JUSTIQTY,Authorized:AUTHOQTY});

        }
        var store04 = Ext.create('Ext.data.Store', {
                    fields: ['anio', 'Accepted','Suggested', 'Reaudited','Rejected','Justified','Authorized'],
                    data: arrayDataGra

            });
        var chart01 = Ext.create('Ext.panel.Panel', {
                    id: prototype.id + '-graficosAños',
                     
                    items: [
                        {
                            xtype: 'cartesian',
                           width: '100%',
                            height: 400,
                             insetPadding: '10 40 0 10',
                            autoScroll: true,
                            captions: {
                                title: {
                                    text: 'Suggested documents Rejected',
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
                                    fields: ['Accepted','Suggested', 'Reaudited','Rejected','Justified','Authorized'],
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
                                        translationX: - 30
                                    },
                                    grid: true
                                }
                            ],
                            series: {
                                type: 'bar3d',
                                stacked: false,
                                title: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                                xField: 'anio',
                                yField: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                                label: {
                                    field: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                                    display: 'outside',orientation:'horizontal',
                                   // renderer: 'onSeriesLabelRender'
                                   renderer: 'onSeriesLabelRender'
                                },
                                highlight: true,
                                style: {
                                    inGroupGapWidth: - 7
                                }
                            }
                        }
                    ],
                    listeners:{ 
                        afterrender:function(obj){
                            panel.updateLayout();
                        }
                    },
                    tbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Download',
                            handler: function(btn, e, eOpts) {
                                btn.up('panel').down("cartesian").download({
                                    filename: "Suggested documents Rejected Years"
                                });
                            }
                        }
                    ]
                });
                panel.add(chart01);
       //fin del primer grafico
       //SEGUNDO GRAFICO
        var pane2 = Ext.getCmp(prototype.id + '-chart2');
        var VL_SUGGESTQTY = 0; var VL_ACCEPTQTY =0; var VL_REAUTQTY=0; var VL_REJETQTY=0;
        var VL_JUSTIQTY = 0; var VL_AUTHOQTY =0; var VL_TOTAL=0;
        for (var i = 0; i < Objtemp.length; i++) {
            
            VL_SUGGESTQTY+= parseFloat(Objtemp[i].data.SUGGESTQTY);
            VL_ACCEPTQTY+= parseFloat(Objtemp[i].data.ACCEPTQTY);
            VL_REAUTQTY+= parseFloat(Objtemp[i].data.REAUTQTY);
            VL_REJETQTY+= parseFloat(Objtemp[i].data.REJETQTY);
            VL_JUSTIQTY+= parseFloat(Objtemp[i].data.JUSTIQTY);
            VL_AUTHOQTY+= parseFloat(Objtemp[i].data.AUTHOQTY);
            VL_TOTAL+= parseFloat(Objtemp[i].data.TOTAL);
        }
        VL_SUGGESTQTY  = win.formatLngNumber((( VL_SUGGESTQTY * 100) / VL_TOTAL));
        VL_ACCEPTQTY  = win.formatLngNumber(((VL_ACCEPTQTY * 100) / VL_TOTAL));
        VL_REAUTQTY  = win.formatLngNumber(((VL_REAUTQTY * 100) / VL_TOTAL));
        VL_REJETQTY  = win.formatLngNumber(((VL_REJETQTY * 100) / VL_TOTAL));
        VL_JUSTIQTY  = win.formatLngNumber(((VL_JUSTIQTY * 100) / VL_TOTAL));
        VL_AUTHOQTY  = win.formatLngNumber(((VL_AUTHOQTY * 100) / VL_TOTAL));
        var store03 = Ext.create('Ext.data.Store', {
            fields: ['os', 'data1' ],
                    data: [
                    { os: 'Accepted', data1: VL_ACCEPTQTY,label: VL_ACCEPTQTY +'%' },
                    { os: 'Rejected', data1: VL_REJETQTY,label: VL_REJETQTY +'%' },
                    { os: 'Suggested', data1: VL_SUGGESTQTY,label: VL_SUGGESTQTY +'%' },
                    { os: 'Reaudited', data1: VL_REAUTQTY,label: VL_REAUTQTY +'%' },
                    { os: 'Justified', data1: VL_JUSTIQTY,label: VL_JUSTIQTY +'%' },
                    { os: 'Authorized', data1: VL_AUTHOQTY,label: VL_AUTHOQTY +'%' }
                    ]
            });
         var chart03 = Ext.create('Ext.panel.Panel', {
                  id: prototype.id + '-graficoschart',
                items:[
                    {
                        xtype: 'polar',
                        height: 380,
                        captions: {
                            title: 'Suggested documents Rejected %'
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
                                    filename: "Suggested documents Rejected Years %"
                                });
                            }
                        }
                    ]
                });
                pane2.add(chart03);
       //FIN DEL SEGUNDO GRAFICO
       //tercer grafico por mes
        var panel3 = Ext.getCmp(prototype.id + '-chart3');
       //primer grafico
        var arraySearchMonth = [];
        var arrayDataMonth = [];
        var arrayDataGraMonth = [];
         for (var i = 0; i < lstNewList.length; ++i) {
             if (arraySearchMonth.indexOf(String(lstNewList[i].A1672FPROC)) < 0) {
                    arraySearchMonth.push(String(lstNewList[i].A1672FPROC));
                    arrayDataMonth.push({
                        A1672FPROC: String(lstNewList[i].A1672FPROC),
                        children: [{SUGGESTQTY: lstNewList[i].SUGGESTQTY, ACCEPTQTY: lstNewList[i].ACCEPTQTY, REAUTQTY: lstNewList[i].REAUTQTY,REJETQTY: lstNewList[i].REJETQTY,JUSTIQTY: lstNewList[i].JUSTIQTY,AUTHOQTY: lstNewList[i].AUTHOQTY}]

                    });
             } else {
                 arrayDataMonth[arraySearchMonth.indexOf(String(lstNewList[i].A1672FPROC))].children.push({SUGGESTQTY: lstNewList[i].SUGGESTQTY, ACCEPTQTY: lstNewList[i].ACCEPTQTY, REAUTQTY: lstNewList[i].REAUTQTY,REJETQTY: lstNewList[i].REJETQTY,JUSTIQTY: lstNewList[i].JUSTIQTY,AUTHOQTY: lstNewList[i].AUTHOQTY});
             }
         }
         var SUGGESTQTY = 0;
         var ACCEPTQTY = 0;
         var REAUTQTY = 0;
         var REJETQTY = 0;
         var JUSTIQTY = 0;
         var AUTHOQTY =0;
        for (var i = 0; i < arrayDataMonth.length; ++i) {
            SUGGESTQTY = 0;
            ACCEPTQTY = 0;
            REAUTQTY = 0;
            REJETQTY = 0;
            JUSTIQTY = 0;
            AUTHOQTY =0;
            for (var vi = 0; vi < arrayDataMonth[i].children.length; ++vi) {
                SUGGESTQTY += parseFloat(arrayDataMonth[i].children[vi].SUGGESTQTY);
                ACCEPTQTY += parseFloat(arrayDataMonth[i].children[vi].ACCEPTQTY);
                REAUTQTY += parseFloat(arrayDataMonth[i].children[vi].REAUTQTY);
                REJETQTY += parseFloat(arrayDataMonth[i].children[vi].REJETQTY);
                JUSTIQTY += parseFloat(arrayDataMonth[i].children[vi].JUSTIQTY);
                AUTHOQTY += parseFloat(arrayDataMonth[i].children[vi].AUTHOQTY);
            }
            arrayDataGraMonth.push({anio: arrayDataMonth[i].A1672FPROC, Suggested: SUGGESTQTY, Accepted: ACCEPTQTY, Reaudited: REAUTQTY, Rejected:REJETQTY,Justified:JUSTIQTY,Authorized:AUTHOQTY});

        }
        var storeMonth = Ext.create('Ext.data.Store', {
                    fields: ['anio', 'Accepted','Suggested', 'Reaudited','Rejected','Justified','Authorized'],
                    data: arrayDataGraMonth

            });
        var chart03 = Ext.create('Ext.panel.Panel', {
                    id: prototype.id + '-graficosmonthDe',
                     
                    items: [
                        {
                            xtype: 'cartesian',
                           width: '100%',
                            height: 400,
                             insetPadding: '10 40 0 10',
                            autoScroll: true,
                            captions: {
                                title: {
                                    text: 'Suggested documents Rejected',
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
                            store: storeMonth,
                            legend: {
                                type: 'dom',
                                docked: 'bottom'
                            },
                            axes: [
                                {
                                    type: 'numeric3d',
                                    position: 'left',
                                    fields: ['Accepted','Suggested', 'Reaudited','Rejected','Justified','Authorized'],
                                    grid: true//,
                                    //title: 'Sales in USD',
                                    // renderer: 'onAxisLabelRender'
                                }, 
                                {
                                    type: 'category3d',
                                    position: 'bottom',
                                    fields: 'anio',
                                    title: {
                                        text: 'Months',
                                        translationX: - 30
                                    },
                                    grid: true
                                }
                            ],
                            series: {
                                type: 'bar3d',
                                stacked: false,
                                title: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                                xField: 'anio',
                                yField: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                                label: {
                                    field: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                                    display: 'outside',orientation:'horizontal',
                                   // renderer: 'onSeriesLabelRender'
                                   renderer: 'onSeriesLabelRender'
                                },
                                highlight: true,
                                style: {
                                    inGroupGapWidth: - 7
                                }
                            }
                        }
                    ],
                    listeners:{ 
                        afterrender:function(obj){
                            panel.updateLayout();
                        }
                    },
                    tbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Download',
                            handler: function(btn, e, eOpts) {
                                btn.up('panel').down("cartesian").download({
                                    filename: "Suggested documents Rejected Years"
                                });
                            }
                        }
                    ]
                });
                panel3.add(chart03);     
                
                //grafico cuarto
                var panel4 = Ext.getCmp(prototype.id + '-chart4');
                
                var lstcombination = new Array();
                for (var i = 0; i < Objtemp.length; i++) {
                     var beanList = new Array(); //Objtemp[i].data;
                         beanList.A1672FPROC = Objtemp[i].data.A1672FPROC +""+Objtemp[i].data.A1672FUENT;
                         beanList.SUGGESTQTY = Objtemp[i].data.SUGGESTQTY;
                         beanList.ACCEPTQTY = Objtemp[i].data.ACCEPTQTY;
                         beanList.REAUTQTY = Objtemp[i].data.REAUTQTY;
                         beanList.REJETQTY = Objtemp[i].data.REJETQTY;
                         beanList.JUSTIQTY = Objtemp[i].data.JUSTIQTY;
                         beanList.AUTHOQTY = Objtemp[i].data.AUTHOQTY;
                         beanList.TOTAL = Objtemp[i].data.TOTAL;
                         lstcombination.push(beanList);
                 }
                var arraycombination = [];
                var arrayDatacombination = [];
                var arrayDataGracombination = [];
                 for (var i = 0; i < lstcombination.length; ++i) {
                     if (arraycombination.indexOf(String(lstcombination[i].A1672FPROC)) < 0) {
                            arraycombination.push(String(lstcombination[i].A1672FPROC));
                            arrayDatacombination.push({
                                A1672FPROC: String(lstcombination[i].A1672FPROC),
                                children: [{SUGGESTQTY: lstcombination[i].SUGGESTQTY, ACCEPTQTY: lstcombination[i].ACCEPTQTY, REAUTQTY: lstcombination[i].REAUTQTY,REJETQTY: lstcombination[i].REJETQTY,JUSTIQTY: lstcombination[i].JUSTIQTY,AUTHOQTY: lstcombination[i].AUTHOQTY,TOTAL: lstcombination[i].TOTAL}]

                            });
                     } else {
                         arrayDatacombination[arraycombination.indexOf(String(lstcombination[i].A1672FPROC))].children.push({SUGGESTQTY: lstcombination[i].SUGGESTQTY, ACCEPTQTY: lstcombination[i].ACCEPTQTY, REAUTQTY: lstcombination[i].REAUTQTY,REJETQTY: lstcombination[i].REJETQTY,JUSTIQTY: lstcombination[i].JUSTIQTY,AUTHOQTY: lstcombination[i].AUTHOQTY,TOTAL: lstcombination[i].TOTAL});
                     }
                 }
         var SUGGESTQTY = 0;var ACCEPTQTY = 0;var REAUTQTY = 0;var REJETQTY = 0;var JUSTIQTY = 0; var AUTHOQTY =0; var TOTAL=0;
        for (var i = 0; i < arrayDatacombination.length; ++i) {
            SUGGESTQTY = 0;ACCEPTQTY = 0;REAUTQTY = 0;REJETQTY = 0;JUSTIQTY = 0;AUTHOQTY =0;TOTAL=0;
            for (var vi = 0; vi < arrayDatacombination[i].children.length; ++vi) {
                SUGGESTQTY += parseFloat(arrayDatacombination[i].children[vi].SUGGESTQTY);
                ACCEPTQTY += parseFloat(arrayDatacombination[i].children[vi].ACCEPTQTY);
                REAUTQTY += parseFloat(arrayDatacombination[i].children[vi].REAUTQTY);
                REJETQTY += parseFloat(arrayDatacombination[i].children[vi].REJETQTY);
                JUSTIQTY += parseFloat(arrayDatacombination[i].children[vi].JUSTIQTY);
                AUTHOQTY += parseFloat(arrayDatacombination[i].children[vi].AUTHOQTY);
                TOTAL += parseFloat(arrayDatacombination[i].children[vi].TOTAL);
            }
            SUGGESTQTY  = win.formatLngNumber((( SUGGESTQTY * 100) / TOTAL)); 
            ACCEPTQTY  = win.formatLngNumber((( ACCEPTQTY * 100) / TOTAL));
            REAUTQTY  = win.formatLngNumber((( REAUTQTY * 100) / TOTAL));
            REJETQTY  = win.formatLngNumber((( REJETQTY * 100) / TOTAL));
            JUSTIQTY  = win.formatLngNumber((( JUSTIQTY * 100) / TOTAL));
            AUTHOQTY  = win.formatLngNumber((( AUTHOQTY * 100) / TOTAL));
            arrayDataGracombination.push({month: arrayDatacombination[i].A1672FPROC, Suggested: SUGGESTQTY, Accepted: ACCEPTQTY, Reaudited: REAUTQTY, Rejected:REJETQTY,Justified:JUSTIQTY,Authorized:AUTHOQTY});

        }
               
                var store4 = Ext.create('Ext.data.Store', {
                     // IE    Firefox  Chrome   Safari
                        fields: ['month', 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                        data: arrayDataGracombination
                });
                var chart04 = Ext.create('Ext.panel.Panel', {
                    id: prototype.id + '-graficosStacked',
                     
                    items: [{
                            xtype: 'cartesian',
                            reference: 'chart',
                            captions: {
                                title: 'Suggested documents Rejected'
                            },
                            store: store4,
                            theme: 'Muted',
                            width: '100%',
                            height: 400,
                            interactions: ['itemhighlight'],
                            series: {
                                    type: 'bar',
                                    fullStack: true,
                                    title: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                                    xField: 'month',
                                    yField: [ 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                                    stacked: true,
                                    style: {
                                        opacity: 0.80
                                    },
                                    highlightCfg: {
                                        opacity: 1,
                                        strokeStyle: 'black'
                                    },
                                    tooltip: {
                                        trackMouse: true,
                                        renderer: 'onSeriesTooltipRender'
                                    }
                                },
                            legend: {
                                docked: 'bottom'
                            },
                            axes:  [{
                                        type: 'numeric',
                                        position: 'left',
                                        grid: true,
                                        fields: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized' ],
                                        label: {
                                            renderer: 'onAxisLabelRender'
                                        },
                                        minimum: 0,
                                        maximum: 100
                                    }, 
                                    {
                                        type: 'category',
                                        position: 'bottom',
                                        grid: true,
                                        fields: ['month'],
                                        label: {
                                            rotate: {
                                                degrees: -45
                                            }
                                        }
                                    }]
                        }],
                    listeners:{ 
                        afterrender:function(obj){
                            panel4.updateLayout();
                        }
                    },
                    tbar: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Download',
                            handler: function(btn, e, eOpts) {
                                btn.up('panel').down("cartesian").download({
                                    filename: "Suggested documents Rejected Years"
                                });
                            }
                        }
                    ]
                });
                panel4.add(chart04); 
       //fin del tercer por mes
       //Graficos por usuario
       if(Ext.getCmp(prototype.id + '-txtUser').getValue()!==''){
           Ext.getCmp(prototype.id + '-graficosUser').setDisabled(false);
           // 
            var panel5 = Ext.getCmp(prototype.id + '-chart5');
            var lstnewUser = new Array();
            for (var i = 0; i < Objtemp.length; i++) {
                 var beanUser = new Array(); //Objtemp[i].data;
                     beanUser.A1672FPROC = Objtemp[i].data.A1672REVIS;
                     beanUser.SUGGESTQTY = Objtemp[i].data.SUGGESTQTY;
                     beanUser.ACCEPTQTY = Objtemp[i].data.ACCEPTQTY;
                     beanUser.REAUTQTY = Objtemp[i].data.REAUTQTY;
                     beanUser.REJETQTY = Objtemp[i].data.REJETQTY;
                     beanUser.JUSTIQTY = Objtemp[i].data.JUSTIQTY;
                     beanUser.AUTHOQTY = Objtemp[i].data.AUTHOQTY;
                     lstnewUser.push(beanUser);
             }
             var arrayUser = [];
             var arrayDataUser = [];
             var arrayDataGraUser = [];
             for (var i = 0; i < lstnewUser.length; ++i) {
                 if (arrayUser.indexOf(String(lstnewUser[i].A1672FPROC)) < 0) {
                        arrayUser.push(String(lstnewUser[i].A1672FPROC));
                            arrayDataUser.push({
                                A1672FPROC: String(lstnewUser[i].A1672FPROC),
                                children: [{SUGGESTQTY: lstnewUser[i].SUGGESTQTY, ACCEPTQTY: lstnewUser[i].ACCEPTQTY, REAUTQTY: lstnewUser[i].REAUTQTY,REJETQTY: lstnewUser[i].REJETQTY,JUSTIQTY: lstnewUser[i].JUSTIQTY,AUTHOQTY: lstnewUser[i].AUTHOQTY}]

                            });
                 } else {
                         arrayDataUser[arrayUser.indexOf(String(lstnewUser[i].A1672FPROC))].children.push({SUGGESTQTY: lstnewUser[i].SUGGESTQTY, ACCEPTQTY: lstnewUser[i].ACCEPTQTY, REAUTQTY: lstnewUser[i].REAUTQTY,REJETQTY: lstnewUser[i].REJETQTY,JUSTIQTY: lstnewUser[i].JUSTIQTY,AUTHOQTY: lstnewUser[i].AUTHOQTY});
                     }
             }
             var SUGGESTQTY = 0;var ACCEPTQTY = 0;var REAUTQTY = 0;var REJETQTY = 0;var JUSTIQTY = 0; var AUTHOQTY =0;
             for (var i = 0; i < arrayDataUser.length; ++i) {
                 SUGGESTQTY = 0;ACCEPTQTY = 0;REAUTQTY = 0;REJETQTY = 0;JUSTIQTY = 0;AUTHOQTY =0;
                for (var vi = 0; vi < arrayDataUser[i].children.length; ++vi) {
                    SUGGESTQTY += parseFloat(arrayDataUser[i].children[vi].SUGGESTQTY);
                    ACCEPTQTY += parseFloat(arrayDataUser[i].children[vi].ACCEPTQTY);
                    REAUTQTY += parseFloat(arrayDataUser[i].children[vi].REAUTQTY);
                    REJETQTY += parseFloat(arrayDataUser[i].children[vi].REJETQTY);
                    JUSTIQTY += parseFloat(arrayDataUser[i].children[vi].JUSTIQTY);
                    AUTHOQTY += parseFloat(arrayDataUser[i].children[vi].AUTHOQTY);
                }
                arrayDataGraUser.push({country: arrayDataUser[i].A1672FPROC, Suggested: SUGGESTQTY, Accepted: ACCEPTQTY, Reaudited: REAUTQTY, Rejected:REJETQTY,Justified:JUSTIQTY,Authorized:AUTHOQTY});
             }
             
           var store5 = Ext.create('Ext.data.Store', {
                    fields: ['country', 'Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                    data: arrayDataGraUser
                            /*[
                                { country: 'USA',     agr: 188217, ind: 2995787, ser: 12500746},
                                { country: 'China',   agr: 918138, ind: 3611671, ser: 3792665},
                                { country: 'Japan',   agr: 71568,  ind: 1640091, ser: 4258274},
                                { country: 'UK',      agr: 17084,  ind: 512506,  ser: 1910915},
                                { country: 'Russia',  agr: 78856,  ind: 727906,  ser: 1215198}
                            ]*/
                       });
          var chart05 = Ext.create('Ext.panel.Panel', {
                        id: prototype.id + '-graficosUserPrin',
                        items: [{
                                xtype: 'cartesian',
                                reference: 'chart',
                                captions: {
                                    title: 'Suggested documents Rejected'
                                },
                                store: store5,
                                theme: 'Muted',
                                width: '100%',
                                height: 400,
                                interactions: ['itemhighlight'],
                                series: {
                                    type: 'bar3d',
                                    xField: 'country',
                                    yField: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                                    title: ['Accepted','Rejected','Suggested', 'Reaudited','Justified','Authorized'],
                                    style: {
                                        maxBarWidth: 80
                                    },
                                    highlight: true,
                                    tooltip: {
                                        trackMouse: true,
                                        renderer: 'onTooltipRender'
                                    }
                                },
                                legend: {
                                    docked: 'bottom'
                                },
                                axes: [{
                                    type: 'numeric3d',
                                    position: 'left',
                                    grid: {
                                        odd: {
                                            fillStyle: 'rgba(255, 255, 255, 0.06)'
                                        },
                                        even: {
                                            fillStyle: 'rgba(0, 0, 0, 0.03)'
                                        }
                                    },
                                    //title: 'Billions of USD',
                                    renderer: 'onAxisLabel2Render',
                                    listeners: {
                                        rangechange: 'onAxisRangeChange'
                                    }
                                }, {
                                    type: 'category3d',
                                    position: 'bottom',
                                    grid: true
                                }]
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
                            }],
                        listeners:{ 
                            afterrender:function(obj){
                                panel5.updateLayout();
                            }
                        },
                        tbar: [
                            {
                                xtype: 'segmentedbutton',
                                width: 200,
                                items: [{
                                    text: 'Stack',
                                    pressed: true
                                }, {
                                    text: 'Group'
                                }],
                                listeners: {
                                    toggle: 'onStackedToggle'
                                }
                            },
                            '->',
                            {
                                xtype: 'button',
                                text: 'Download',
                                handler: function(btn, e, eOpts) {
                                    btn.up('panel').down("cartesian").download({
                                        filename: "Suggested documents Rejected Years"
                                    });
                                }
                            }
                        ]
                    });
                    panel5.add(chart05);
           
       }else{
            Ext.getCmp(prototype.id + '-graficosUser').setDisabled(true);
       }
       //fin de los grafcios
    },
    onStackedToggle: function (segmentedButton, button, pressed) {
        var chart = this.lookup('chart'),
            series = chart.getSeries()[0],
            value = segmentedButton.getValue();
        series.setStacked(value === 0);
        chart.redraw();
    },
    onAxisRangeChange: function (axis, range) {
        if (!range) {
            return;
        }
        // expand the range slightly to make sure markers aren't clipped
        if (range[1] > 15000000) {
            range[1] = 18000000;
        }else if(range[1] > 6000){
            range[1] = 9000;
        }else if(range[1] > 5000){
            range[1] = 6000;
        }else if(range[1] > 4000){
            range[1] = 5000;
        }else if(range[1] > 3000){
            range[1] = 4000;
        }else if(range[1] > 2000){
            range[1] = 3000;
        }else if(range[1] > 1000){
            range[1] = 2000;
        }else{
            range[1] = 1000;
        }
    },
     onTooltipRender: function (tooltip, record, item) {
        var formatString = '0,000',
            fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            sector = item.series.getTitle()[fieldIndex],
            value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    },
    onAxisLabel2Render: function (axis, label, layoutContext) {
        
        if(label>15000000){return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
        }else{return Ext.util.Format.number(layoutContext.renderer(label), '0,000');}
    },
    onAxisLabel5Render: function (axis, label, layoutContext) {
         if(label>15000000){return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
        }else{return Ext.util.Format.number(layoutContext.renderer(label), '0,000');}
    },
    onSeriesLabelRender: function (value) {
        return Ext.util.Format.number(value, '0,000');
    },
    onSeriesTooltipRender: function (tooltip, record, item) {
       var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
           browser = item.series.getTitle()[fieldIndex];

       tooltip.setHtml(browser + ' on ' + record.get('month') + ': ' +
           record.get(item.field) + '%');
   }, 
   onColumnRender: function (v) {
        return v + '%';
    },
    OnAmountSummary: function(value, summaryData, dataIndex) {
       return Ext.util.Format.number(value, '0,000.00');
    },
    onAxisLabelRender: function (axis, label, layoutContext) {
        return layoutContext.renderer(label) + '%';
    },
    onColumnAmountRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnColumnProcessingDateRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_detalle: function(rowIndex) {
        
         var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
         var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
         var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
         var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
         var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'G');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnSourceDateRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().DetailSourceDocuments(' + rowIndex + ');">' + value + '</span>'
    },
    DetailSourceDocuments: function(rowIndex) {
        
         var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
         var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
         var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
         var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
         var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);OnColumnProcessing2DateRenderer
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'');
            ScrDetailSuggestedDocuments.show();
    },
     OnColumnReauditedRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Reaudited(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
    searchform_Reaudited: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'R');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnRejectedRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Rejected(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
    searchform_Rejected: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'N');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnJustifiedRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Justified(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
    searchform_Justified: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'J');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnAuthorizedRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Authorized(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
    
    searchform_Authorized: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'Z');
            ScrDetailSuggestedDocuments.show();
    },
    
    OnColumnSuggestedRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Suggested(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00')+ '</span>'
     },
    searchform_Suggested: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'Y');
            ScrDetailSuggestedDocuments.show();
    },
     OnColumnAcceptedRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Accepted(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
     searchform_Accepted: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'A');
            ScrDetailSuggestedDocuments.show();
    },
    
    OnColumnProcessing2DateRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_detalle2(' + rowIndex + ');">' + value + '</span>'
     },
    searchform_detalle2: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'G');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnSource2DateRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Source_detalle2(' + rowIndex + ');">' + value + '</span>'
     },
    searchform_Source_detalle2: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'');
            ScrDetailSuggestedDocuments.show();
    },
    
     OnColumnPendiRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Pendi(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
     searchform_Pendi: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'W');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnSuggested2Renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Suggested2(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
     searchform_Suggested2: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'Y');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnAccepted2Renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Accepted2(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
     searchform_Accepted2: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'A');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnReaudited2Renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Reaudited2(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
     searchform_Reaudited2: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'R');
            ScrDetailSuggestedDocuments.show();
    },
     OnColumnRejected2Renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Rejected2(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
     searchform_Rejected2: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'N');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnJustified2Renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Justified2(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
      searchform_Justified2: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'J');
            ScrDetailSuggestedDocuments.show();
    },
     OnColumnUnregisteredRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Unregistered(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
     searchform_Unregistered: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'C');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnDisabledRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Disabled(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
    searchform_Disabled: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'D');
            ScrDetailSuggestedDocuments.show();
    },
    OnColumnAuthorized2Renderer: function(value, metaData, record, rowIndex, colIndex, store, view){
            metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
            return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_Authorized2(' + rowIndex + ');">' + Ext.util.Format.number(value, '0,000,00') + '</span>'
     },
     searchform_Authorized2: function(rowIndex) {
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var TxtCountry = Ext.getCmp(prototype.id + '-country').getValue();
        var TxtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var TxtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();
        var TxtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();       
        
        var grid = Ext.getCmp(prototype.id + '-gridReport2');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var data = rec.data;
        
        var ScrDetailSuggestedDocuments = Ext.create('Ext.Praxis.view.salesaudit.SuggestedDocuments.DetailSuggestedDocuments', {id: 'DetailSuggestedDocuments'});
        var controller = ScrDetailSuggestedDocuments.getController();
            controller.initial_detalle_GN(data, ComboBy, TxtCountry,TxtCurrency,TxtUser,TxtIATA,'Z');
            ScrDetailSuggestedDocuments.show();
    },
    
});

