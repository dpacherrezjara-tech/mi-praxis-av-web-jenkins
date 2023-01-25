Ext.define('Ext.Praxis.controller.sales.InterlineAnalysis.InterlineAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InterlineAnalysisController',
    requires: [
        'Ext.Praxis.view.sales.InterlineAnalysisForm.Info',
        'Ext.Praxis.view.sales.InterlineAnalysisForm.Info2'
    ],
    beanXLS: {},
    recGrid01:{},
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
    },
    afterRender: function() {
        //Ext.get('title-module').update('Sales Analysis');        
        this.setStoreData();
        //this.btnSearch_click();
    },
    onSalesSourceChange: function(cmp, newValue) {

    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(new Date().getFullYear());
        //this.loadCountry();
        //this.setValue('cmbCountry', '');
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.Onsearch();
    },
    btnFilter_click: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    btnExcel_click: function(obj, e) {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Download Excel ?',
//            buttons: Ext.MessageBox.OKCANCEL,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn) {
//                if (btn === 'ok') {
//                    global.getFile(prototype.url + '/getXLSXAPI?beanString=' + encodeURI(JSON.stringify(this.beanXLS)));
//                }
//            }
//        });
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();        
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            global.showMenu();
        }  
        
        Ext.getCmp(prototype.id + '-btn-graph').show();
        if ( Ext.getCmp(prototype.id + '-cont-chart') !== undefined )
            Ext.getCmp(prototype.id + '-cont-chart').show();
        
        Ext.getCmp(prototype.id + '-panel-contenedor-grid').setHeight(390);
        Ext.getCmp(prototype.id + '-panel-contenedor-grid').updateLayout();        
        Ext.getCmp(prototype.id+'-boxPaginacion').hide();        
        this.search(); 
    },
    // </editor-fold>
    onGridLoad: function() {
        this.Onsearch();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    stateFilter: function(bool) {
        
        Ext.getCmp(prototype.id + '-cmbDateYear').setVisible(bool ? false : true);           
        Ext.getCmp(prototype.id + '-chk-oal').setVisible(bool);
        Ext.getCmp(prototype.id + '-txt-diff').setVisible(bool);
        Ext.getCmp(prototype.id + '-lbl-diff').setVisible(bool);
        Ext.getCmp(prototype.id + '-txt-carrier').setVisible(bool);
        if (!bool) {
            Ext.getCmp(prototype.id + '-chk-oal').setValue(false);
            Ext.getCmp(prototype.id + '-txt-diff').setValue('');
            Ext.getCmp(prototype.id + '-txt-carrier').setValue('');
        }
    },
    onGraphClick: function(){
        //console.log('graficos');        
        var contenedor = Ext.getCmp(prototype.id + '-centerC');        
        if ( Ext.getCmp(prototype.id + '-cont-chart') !== undefined ){
            contenedor.remove(Ext.getCmp(prototype.id + '-cont-chart'));
            return false;
        }

        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();

        var on_data_km_am = 0, off_data_km_oal = 0, on_exc_km_am = 0, off_exc_km_oal = 0;
        var on_data_usd_am = 0, off_data_usd_oal = 0, on_exc_usd_am = 0, off_exc_usd_oal = 0;
        var p01 = 0, p02 = 0;
        store.each(function(value, index){
            on_data_km_am += parseFloat(value.get('KM_ON_ALL'));
            off_data_km_oal += parseFloat(value.get('KM_OFF_ALL'));
            on_exc_km_am += parseFloat(value.get('KM_ON'));
            off_exc_km_oal += parseFloat(value.get('KM_OFF'));

            on_data_usd_am += parseFloat(value.get('FARE_ON_ALL'));
            off_data_usd_oal += parseFloat(value.get('FARE_OFF_ALL'));
            on_exc_usd_am += parseFloat(value.get('FARE_ON'));
            off_exc_usd_oal += parseFloat(value.get('FARE_OFF'));
        });

        p01 = parseFloat( ( ( on_exc_km_am + off_exc_km_oal ) * 100 ) / ( on_data_km_am + off_data_km_oal ) );
        p02 = parseFloat( ( ( on_exc_usd_am + off_exc_usd_oal ) * 100 ) / ( on_data_usd_am + off_data_usd_oal ) );

        var store01 = Ext.create('Ext.data.Store',{
            fields: ['data', 'data1', 'data2' ],
            data: [
                { data: 'AM Miles', data1: parseFloat( ( on_data_km_am * 100 ) / ( on_data_km_am + off_data_km_oal ) ), data2: on_data_km_am },
                { data: 'OAL Miles', data1: parseFloat( ( off_data_km_oal * 100 ) / ( on_data_km_am + off_data_km_oal ) ), data2: off_data_km_oal }
            ]
        });

        var store02 = Ext.create('Ext.data.Store',{
            fields: ['data', 'data1', 'data2' ],
            data: [
                { data: 'AM Miles', data1: parseFloat( ( on_exc_km_am * 100 ) / ( on_exc_km_am + off_exc_km_oal ) ), data2: on_exc_km_am },
                { data: 'OAL Miles', data1: parseFloat( ( off_exc_km_oal * 100 ) / ( on_exc_km_am + off_exc_km_oal ) ), data2: off_exc_km_oal }
            ]
        });

        var store03 = Ext.create('Ext.data.Store',{
            fields: ['data', 'data1', 'data2' ],
            data: [
                { data: 'AM USD', data1: parseFloat( ( on_data_usd_am * 100 ) / ( on_data_usd_am + off_data_usd_oal ) ), data2: on_data_usd_am },
                { data: 'OAL USD', data1: parseFloat( ( off_data_usd_oal * 100 ) / ( on_data_usd_am + off_data_usd_oal ) ), data2: off_data_usd_oal }
            ]
        });

        var store04 = Ext.create('Ext.data.Store',{
            fields: ['data', 'data1', 'data2' ],
            data: [
                { data: 'AM USD', data1: parseFloat( ( on_exc_usd_am * 100 ) / ( on_exc_usd_am + off_exc_usd_oal ) ), data2: on_exc_usd_am },
                { data: 'OAL USD', data1: parseFloat( ( off_exc_usd_oal * 100 ) / ( on_exc_usd_am + off_exc_usd_oal ) ), data2: off_exc_usd_oal }
            ]
        });

        var panel = Ext.create('Ext.panel.Panel',{
            id: prototype.id + '-cont-chart',
            height: 640,
            //width: 1250,
            width: '100%',
            border: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults:{
                        style: 'margin: 1px;',
                        border: true
                    },
                    items:[
                        {
                            xtype: 'fieldset',
                            title: '100% DATA',
                            width: 600,
                            height: 300,
                            layout: 'border',
                            defaults:{
                                border: false
                            },
                            items:[
                                {
                                    region: 'west',
                                    width: 250,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items:[
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            border: false,
                                            items:[
                                                {
                                                    xtype: 'grid',
                                                    store: store01,
                                                    width: 250,
                                                    columnLines: true,
                                                    border: false,
                                                    features: [{
                                                        ftype: 'summary'
                                                    }],
                                                    columns:{
                                                        items:[
                                                            { text: 'Description', dataIndex: 'data', flex: 1, align: 'left'},
                                                            { text: 'Miles', dataIndex: 'data2', flex: 1, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            { text: '%', dataIndex: 'data1', flex: 1, renderer: 'onAmountRenderer01', summaryType: 'sum',
                                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                                    return Ext.util.Format.number(100, '0,000.00');
                                                                }
                                                            }
                                                        ],
                                                        defaults:{
                                                           sortable: false,
                                                           menuDisabled: true,
                                                           align: 'center'
                                                        }
                                                    },
                                                    viewConfig: {
                                                        trackOver: true,
                                                        stripeRows: true,
                                                        enableTextSelection: true,
                                                        markDirty: false,
                                                        getRowClass: function(record, rowIndex, rowParams, store) {
                                                            if ( rowIndex % 2 == 0 ) return 'rowA';
                                                        }
                                                    },
                                                    trackMouseOver: true,
                                                    scope: this
                                                },
                                                {
                                                    xtype: 'panel',
                                                    width: 250,
                                                    layout: 'hbox',
                                                    border: false,
                                                    defaults:{
                                                        border: false
                                                    },
                                                    items:[
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            listeners:{
                                                                afterrender: function(obj){
                                                                    obj.setHtml('<b style="width: 100%; display: inline-block; text-align: right;">100%</b>');
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    region: 'center',
                                    items:[
                                        {
                                            xtype: 'polar',
                                            border: false,
                                            reference: 'chart01',
                                            theme: 'Muted',
                                            width: '100%',
                                            height: 275,                                            
                                            insetPadding: 50,
                                            innerPadding: 20,
                                            store: store01,
                                            legend: {
                                                docked: 'bottom'
                                            },
                                            interactions: ['itemhighlight', 'rotatePie3d'],
                                            series: [
                                                {
                                                    type: 'pie3d',
                                                    angleField: 'data1',
                                                    donut: 0,
                                                    distortion: 0.6,
                                                    thickness: 20,
                                                    highlight: {
                                                        margin: 40
                                                    },
                                                    label: {
                                                        field: 'data'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'DATA OAL USD > AM USD',
                            width: 600,
                            height: 300,
                            layout: 'border',
                            defaults:{
                                border: false
                            },
                            items:[
                                {
                                    region: 'west',
                                    width: 250,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items:[
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items:[
                                                {
                                                    xtype: 'grid',
                                                    store: store02,
                                                    width: 250,
                                                    columnLines: true,
                                                    border: false,
                                                    features: [{
                                                        ftype: 'summary',
                                                    }],
                                                    columns:{
                                                        items:[
                                                            { text: 'Description', dataIndex: 'data', flex: 1, align: 'left'},
                                                            { text: 'Miles', dataIndex: 'data2', flex: 1, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            { text: '%', dataIndex: 'data1', flex: 1, renderer: 'onAmountRenderer01', summaryType: 'sum',
                                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                                    return Ext.util.Format.number(100, '0,000.00');
                                                                }
                                                            }
                                                        ],
                                                        defaults:{
                                                           sortable: false,
                                                           menuDisabled: true,
                                                           align: 'center'
                                                        }
                                                    },
                                                    viewConfig: {
                                                        trackOver: true,
                                                        stripeRows: true,
                                                        enableTextSelection: true,
                                                        markDirty: false,
                                                        getRowClass: function(record, rowIndex, rowParams, store) {
                                                            if ( rowIndex % 2 == 0 ) return 'rowA';
                                                        }
                                                    },
                                                    trackMouseOver: true,
                                                    scope: this
                                                },
                                                {
                                                    xtype: 'panel',
                                                    width: 250,
                                                    layout: 'hbox',
                                                    border: false,
                                                    defaults:{
                                                        border: false
                                                    },
                                                    items:[
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            listeners:{
                                                                afterrender: function(obj){
                                                                    obj.setHtml('<b style="width: 100%; display: inline-block; text-align: right;">' + Ext.util.Format.number(p01, '0.00') + '%</b>');
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    region: 'center',
                                    items:[
                                        {
                                            xtype: 'polar',
                                            border: false,
                                            reference: 'chart02',
                                            theme: 'Muted',
                                            width: '100%',
                                            height: 275,
                                            insetPadding: 50,
                                            innerPadding: 20,
                                            store: store02,
                                            legend: {
                                                docked: 'bottom'
                                            },
                                            interactions: ['itemhighlight', 'rotatePie3d'],
                                            series: [
                                                {
                                                    type: 'pie3d',
                                                    angleField: 'data1',
                                                    donut: 0,
                                                    distortion: 0.6,
                                                    thickness: 20,
                                                    highlight: {
                                                        margin: 40
                                                    },
                                                    label: {
                                                        field: 'data'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults:{
                        style: 'margin: 1px;'
                    },
                    items:[
                        {
                            xtype: 'fieldset',
                            title: '100% DATA',
                            width: 600,
                            height: 300,
                            layout: 'border',
                            defaults:{
                                border: false
                            },
                            items:[
                                {
                                    region: 'west',
                                    width: 250,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items:[
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items:[
                                                {
                                                    xtype: 'grid',
                                                    store: store03,
                                                    width: 250,
                                                    columnLines: true,
                                                    border: false,
                                                    features: [{
                                                        ftype: 'summary',
                                                    }],
                                                    columns:{
                                                        items:[
                                                            { text: 'Description', dataIndex: 'data', flex: 1, align: 'left'},
                                                            { text: 'Usd', dataIndex: 'data2', flex: 1, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            { text: '%', dataIndex: 'data1', flex: 1, renderer: 'onAmountRenderer01', summaryType: 'sum',
                                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                                    return Ext.util.Format.number(100, '0,000.00');
                                                                }
                                                            }
                                                        ],
                                                        defaults:{
                                                           sortable: false,
                                                           menuDisabled: true,
                                                           align: 'center'
                                                        }
                                                    },
                                                    viewConfig: {
                                                        trackOver: true,
                                                        stripeRows: true,
                                                        enableTextSelection: true,
                                                        markDirty: false,
                                                        getRowClass: function(record, rowIndex, rowParams, store) {
                                                            if ( rowIndex % 2 == 0 ) return 'rowA';
                                                        }
                                                    },
                                                    trackMouseOver: true,
                                                    scope: this
                                                },
                                                {
                                                    xtype: 'panel',
                                                    width: 250,
                                                    layout: 'hbox',
                                                    border: false,
                                                    defaults:{
                                                        border: false
                                                    },
                                                    items:[
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            listeners:{
                                                                afterrender: function(obj){
                                                                    obj.setHtml('<b style="width: 100%; display: inline-block; text-align: right;">100%</b>');
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    region: 'center',
                                    items:[
                                        {
                                            xtype: 'polar',
                                            border: false,
                                            reference: 'chart03',
                                            theme: 'Muted',
                                            width: '100%',
                                            height: 275,
                                            insetPadding: 50,
                                            innerPadding: 20,
                                            store: store03,
                                            legend: {
                                                docked: 'bottom'
                                            },
                                            interactions: ['itemhighlight', 'rotatePie3d'],
                                            series: [
                                                {
                                                    type: 'pie3d',
                                                    angleField: 'data1',
                                                    donut: 0,
                                                    distortion: 0.6,
                                                    thickness: 20,
                                                    highlight: {
                                                        margin: 40
                                                    },
                                                    label: {
                                                        field: 'data'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'DATA OAL USD > AM USD',
                            width: 600,
                            height: 300,
                            layout: 'border',
                            defaults:{
                                border: false
                            },
                            items:[
                                {
                                    region: 'west',
                                    width: 250,
                                    layout: {
                                        type: 'hbox',
                                        align: 'center'
                                    },
                                    items:[
                                        {
                                            xtype: 'panel',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items:[
                                                {
                                                    xtype: 'grid',
                                                    store: store04,
                                                    width: 250,
                                                    columnLines: true,
                                                    border: false,
                                                    features: [{
                                                        ftype: 'summary',
                                                    }],
                                                    columns:{
                                                        items:[
                                                            { text: 'Description', dataIndex: 'data', flex: 1, align: 'left'},
                                                            { text: 'Usd', dataIndex: 'data2', flex: 1, align: 'right', renderer: 'onAmountRenderer', summaryType: 'sum',
                                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            { text: '%', dataIndex: 'data1', flex: 1, renderer: 'onAmountRenderer01', summaryType: 'sum',
                                                                summaryRenderer: function(value, summaryData, dataIndex) {
                                                                    return Ext.util.Format.number(100, '0,000.00');
                                                                }
                                                            }
                                                        ],
                                                        defaults:{
                                                           sortable: false,
                                                           menuDisabled: true,
                                                           align: 'center'
                                                        }
                                                    },
                                                    viewConfig: {
                                                        trackOver: true,
                                                        stripeRows: true,
                                                        enableTextSelection: true,
                                                        markDirty: false,
                                                        getRowClass: function(record, rowIndex, rowParams, store) {
                                                            if ( rowIndex % 2 == 0 ) return 'rowA';
                                                        }
                                                    },
                                                    trackMouseOver: true,
                                                    scope: this
                                                },
                                                {
                                                    xtype: 'panel',
                                                    width: 250,
                                                    layout: 'hbox',
                                                    border: false,
                                                    defaults:{
                                                        border: false
                                                    },
                                                    items:[
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1,
                                                            listeners:{
                                                                afterrender: function(obj){
                                                                    obj.setHtml('<b style="width: 100%; display: inline-block; text-align: right;">' + Ext.util.Format.number(p02, '0.00') + '%</b>');
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'panel',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    region: 'center',
                                    items:[
                                        {
                                            xtype: 'polar',
                                            border: false,
                                            reference: 'chart04',
                                            theme: 'Muted',
                                            width: '100%',
                                            height: 275,
                                            insetPadding: 50,
                                            innerPadding: 20,
                                            store: store04,
                                            legend: {
                                                docked: 'bottom'
                                            },
                                            interactions: ['itemhighlight', 'rotatePie3d'],
                                            series: [
                                                {
                                                    type: 'pie3d',
                                                    angleField: 'data1',
                                                    donut: 0,
                                                    distortion: 0.6,
                                                    thickness: 20,
                                                    highlight: {
                                                        margin: 40
                                                    },
                                                    label: {
                                                        field: 'data'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        contenedor.add(panel);
    },    
    Onsearch: function() {
        this.search();        
    },
    search: function()
    {          
        this.stateFilter(false);
        var bean = {};
        //bean.VP_OPCION = this.getValue('cmbByOrder');
        //console.log('URL INTER:'  + prototype.url + '/search05');
        
        bean.VP_PER = this.getValue('cmbDateYear');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InterlineAnalysis.GridData', {
            proxy: {
                url: prototype.url + '/search05'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: XXXXX");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info',
            id: prototype.id + '-contentInfo'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    onChkOalChange: function() {
        this.getSubGrid();
    },
    onCarrKeypress: function() {
        this.getSubGrid();
    },
    onDiffKeypress: function(obj, e, eOpts) {
        if (e.getKey() == 13) {
            this.getSubGrid();
        }
    },
    onCarrChange: function(obj, newValue, oldValue, eOpts) {
        obj.setValue(Ext.util.Format.uppercase(newValue));
    },
    getSubGrid: function(rowIndex) {
        
        Ext.getCmp(prototype.id + '-panel-contenedor-grid').setHeight(530);
        Ext.getCmp(prototype.id + '-panel-contenedor-grid').updateLayout();
        
        this.stateFilter(true);
        if ( Ext.getCmp(prototype.id + '-gridData') ){
            var grid = Ext.getCmp(prototype.id + '-gridData');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);
            //guarda rec del grid 01
            this.recGrid01 = rec;
        }  
        Ext.getCmp(prototype.id+'-boxPaginacion').show();
        Ext.getCmp(prototype.id + '-btn-graph').hide();
        if ( Ext.getCmp(prototype.id + '-cont-chart') !== undefined )
            Ext.getCmp(prototype.id + '-cont-chart').hide();
        
        var bean = {};
        var bCheckbox =  Ext.getCmp(prototype.id + '-chk-oal').getValue();        
        bean.VP_PER = this.recGrid01.get('MES');
        bean.VP_PARM1 = Ext.getCmp(prototype.id + '-txt-diff').getValue();
        bean.VP_FLAG = bCheckbox ? 'Y' : '';
        bean.VP_CARR = Ext.String.trim(Ext.getCmp(prototype.id + '-txt-carrier').getValue());
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InterlineAnalysis.GridData2', {
            proxy: {
                url: prototype.url + '/search06'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: XXXXX");
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
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info2',
            id: prototype.id + '-contentInfo2'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData01').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
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
            this.btnSearch_click();
        }
    },
    onCmbByOrder: function() {
        var option_order = Ext.getCmp(prototype.id + '-cmbByOrder').getValue();
        Ext.getCmp(prototype.id + '-txt-filter').show();
        Ext.getCmp(prototype.id + '-txt-filter').focus();
        Ext.getCmp(prototype.id + '-txt-filter-num').hide();
        if (option_order === '03' || option_order === '04') {
            Ext.getCmp(prototype.id + '-txt-filter').hide();
            Ext.getCmp(prototype.id + '-txt-filter-num').show();
            Ext.getCmp(prototype.id + '-txt-filter-num').focus();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="FormatRenderer">
    onAmountRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onAmountRenderer01: function(value, metaData, record, rowIndex, colIndex, store, view) {
        //console.log( record.get('typeColumn') );
        switch (record.get('typeColumn')) {
            case 1:
                //console.log(value);
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) === 0 ? '' : value;

                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
                if (Ext.String.trim(record.get('A2775SFTE')) === '' && parseInt(record.get('A2775QTY')) === 0) {
                    if (Ext.String.trim(value) !== '0') {
                        if (Ext.String.trim(value) === '1') {
                            value = '<div style="text-align: center;"><div class="prx-icon-complete prx-icon-base-column"></div><span style="display: inline-block; vertical-align: middle;">Closed</span></div>';
                        } else {
                            var vd = value.split(',');
                            value = vd[0] + vd[1] + vd[2];
                            value = '<div style="text-align: center;"><div class="prx-icon-incomplete prx-icon-base-column"></div><span style="display: inline-block; vertical-align: middle;">' + value.substring(0, 4) + '-' + value.substring(4, 6) + '-' + value.substring(6, 8) + '</span></div>';
                        }
                    } else {
                        value = '';
                    }
                }
        }

        return value;
    },
    onStringRenderer01: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                break;
            default:
                value = value;
        }
        return value;
    },
    onAmountPorRenderer01: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0.00');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = parseInt(value) == 0 ? '' : value;
                break;
            default:
                value = Ext.util.Format.number(value, '0.00');
                if (Ext.String.trim(record.get('A2775SFTE')) === '' && parseInt(record.get('A2775QTY')) === 0) {
                    value = '';
                }
        }
        return value;
    },
    onAmountRenderer03_resta: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "color: red; font-weight: bold;";

        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onAmountRenderer03_suma: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "color: green; ";

        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onCantRenderer03: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onStringRenderer03: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = value == '0' ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = value == '0' ? '' : value;
                break;
            default:
                value = value == '0' ? '' : value;
        }
        return value;
    },
    onAmountRenderer03: function(value, metaData, record, rowIndex, colIndex, store, view) {
        // metaData.style = "color: red; ";
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
    onAmountPorRenderer03: function(value, metaData, record, rowIndex, colIndex, store, view) {
        // metaData.style = "color: green; ";
        // var neto = parseFloat(record.get('NETO'));
        // var totvent = parseFloat(record.get('TOTALVENT'));
        //console.log(neto + '<->' + totvent);
        // value = totvent > 0 ? parseFloat(neto / totvent) : 0;
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0.00');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #A0BFD3 !important; font-weight: bold !important;";
                value = Ext.util.Format.number(value, '0.00');
                break;
            default:
                //console.log(value);
                value = Ext.util.Format.number(value, '0.00');
        }
        return value;
    },
    onMonthStringRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        // console.log(value.substring(4,6));
        var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
        var valor = m[parseInt(value.substring(4, 6)) - 1] + ' - ' + value.substring(0, 4);
        return '<a href="#sales-interline-analysis-form" onclick="Ext.getCmp(\'InterlineAnalysisForm-ContenedorMain\').getController().getSubGrid(' + rowIndex + ');">' + valor + '</a>';
    },
    onCarStringRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        // console.log(record.get('CARR_DES'));
        metaData.tdAttr = "data-qtip='" + record.get('CARR_DES') + "'";
        return value;
    },
    onAmountResumeRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        metaData.style = "background-color: #CCE5CC !important;";
        return value;
    },
    onAmountRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        switch (record.get('typeColumn')) {
            case 1:
                value = Ext.util.Format.number(value, '0,000');
                value = parseInt(value) == 0 ? '' : value;
                break;
            case 2:
                metaData.style = "background-color: #B9B8B6 !important;";
                value = Ext.util.Format.number(value, '0,000');
                break;
            default:
                value = Ext.util.Format.number(value, '0,000');
        }
        return value;
    },
            onAmountRenderer01: function(value, metaData, record, rowIndex, colIndex, store, view) {
                switch (record.get('typeColumn')) {
                    case 1:
                        value = Ext.util.Format.number(value, '0,000.00');
                        value = parseInt(value) == 0 ? '' : value;
                        break;
                    case 2:
                        metaData.style = "background-color: #B9B8B6 !important;";
                        value = Ext.util.Format.number(value, '0,000.00');
                        break;
                    default:
                        value = Ext.util.Format.number(value, '0,000.00');
                }
                return value;
            },
            onCantRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                switch (record.get('typeColumn')) {
                    case 1:
                        value = Ext.util.Format.number(value, '0,000');
                        value = parseInt(value) == 0 ? '' : value;
                        break;
                    case 2:
                        metaData.style = "background-color: #B9B8B6 !important;";
                        value = Ext.util.Format.number(value, '0,000');
                        break;
                    default:
                        value = Ext.util.Format.number(value, '0,000');
                }
                return value;
            }
    // </editor-fold>
});
