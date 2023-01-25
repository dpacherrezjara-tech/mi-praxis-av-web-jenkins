Ext.define('Ext.Praxis.view.sales.CommissionBSPASRForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryCommissionBSPASRForm',
    requires:[
        'Ext.Praxis.controller.sales.CommissionBSPASR.DataEntryCommissionBSPASRController'
    ],
    controller: 'DataEntryCommissionBSPASRController',
    title:'GSA Information',
    header:true,
    height:750,
    width:1400,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: true,
                            margin: '4 2 4 2',
                            bodyStyle: 'background: #E3EAEF;"',
                            defaults: {
                                anchor: '100%',
                                width: 1360
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="Fila 1">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'GSA:',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775GSA',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 87
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Country:',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775PAIS',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 50
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Lote:',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtLote2',
                                            fieldStyle: 'text-align:center',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Source:',
                                            hidden: true,
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4, hidden: true },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtSource',
                                            hidden: true,
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 40
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Send To GSA:',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtPreFac',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 70
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtPreFactura',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 75
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Received GSA:',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtFacRec',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 70
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtFacturaRecibida',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 75
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 2">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Fare BSP ON',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775TFRON',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 87
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Fare ASR ON',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775ASRON',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 87
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Commission HOT ON',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775COMON',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 100
                                        },
                                        { xtype: 'tbspacer', width: 40 },
                                        {
                                            xtype: 'label',
                                            text: '%',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775SCGSA',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 40
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Base',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775BASE',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 80
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Total Comm. GSA',
                                            style: 'font-weight:bold;color:#0B333C;'
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775TPAG',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 93
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="Fila 3">
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: #E3EAEF;"',
                                    defaults: {
                                        anchor: '100%',
                                        margin: '3 0 3 0',
                                        padding: '3 0 3 0'
                                    },
                                    items: [
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'OFF',
                                            style: 'font-weight:bold;color:#0B333C;text-align:right;',
                                            width: 76
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775TFROF',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 87
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'OFF',
                                            style: 'font-weight:bold;color:#0B333C;text-align:right;',
                                            width: 76
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775ASROF',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 87
                                        },
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'OFF',
                                            style: 'font-weight:bold;color:#0B333C;text-align:right;',
                                            width: 76
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775COMOF',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 87
                                        },
                                        { xtype: 'tbspacer', width: 40 },
                                        {
                                            xtype: 'label',
                                            text: 'Curr. Local',
                                            style: 'font-weight:bold;color:#0B333C;text-align:right;',
                                            width: 80
                                        },
                                        { xtype: 'tbspacer', width: 4 },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA1775MDALC',
                                            fieldStyle: 'text-align:left',
                                            readOnly: true,
                                            width: 87
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        },
                        { xtype: 'tbspacer', height: 5 },
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: true,
                            margin: '4 2 4 2',
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                width: 1360
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="filters">
                                        {xtype: 'tbspacer', width: 800, id: prototype.id+'-sps1', hidden: true},
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-boxSearchFilterTKT',
                                            layout: 'hbox',
                                            border: false,
                                            margin: '4 0 4 0',
                                            width: 800,
                                            items: [
                                                {xtype: 'tbspacer', width: 7},
                                                {
                                                    xtype: 'label',
                                                    html: '<strong style="font-weight:bold;color:#0B333C;">Search By: </strong>',
                                                    padding: '4 0 5 0'
                                                },
                                                {xtype: 'tbspacer', width: 15},
                                                {
                                                    xtype:'combo',
                                                    id: prototype.id + '-cmbOptionTKT',
                                                    store: new Ext.data.SimpleStore({
                                                        fields: ['code', 'name'],
                                                        data: [
                                                            ["1", "Select"], ["2", "Ticket"], ["3", "Source"]
                                                        ]
                                                    }),
                                                    queryMode: 'local',
                                                    hiddenLabel: false,
                                                    forceSelection: true,
                                                    caseSensitive: false,
                                                    autoSelect: true,
                                                    editable: false,
                                                    width: 100,
                                                    typeAhead: true,
                                                    emptyText: 'Select',
                                                    valueField: 'code', displayField: 'name',
                                                    listConfig: {maxHeight: 111},
                                                    enableKeyEvents: true,
                                                    triggerAction: 'all',
                                                    listeners:{
                                                        afterrender: function (cmp, eOpts) {
                                                            cmp.setValue("1");
                                                        },
                                                        keyup: function (combo, e) {
                                                            var key = String.fromCharCode(e.getKey());
                                                            var filter = /^[0-9]+$/;
                                                            var test_bool = filter.test(key);
                                                            if (test_bool) {
                                                                combo.doQuery(key);
                                                            }
                                                        },
                                                        change: 'onOptionTKTChange'
                                                    }
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-txtTKTNumberSerie',
                                                    hidden: true,
                                                    value: '139',
                                                    fieldStyle: 'text-align:right',
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9]/,
                                                    readOnly: true,
                                                    width: 30
                                                },
                                                {xtype: 'tbspacer', width: 10},
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-txtTKTNumber',
                                                    hidden: true,
                                                    fieldStyle: 'text-align:right',
                                                    enforceMaxLength: true,
                                                    enableKeyEvents: true,
                                                    maxLength: 13,
                                                    maskRe: /[0-9]/,
                                                    width: 100,
                                                    listeners:{
                                                        keypress: 'onTextKeypress'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id:prototype.id+'-txtFuente',
                                                    hidden: true,
                                                    value: 'BSP',
                                                    fieldStyle: 'text-align:left',
                                                    enforceMaxLength: true,
                                                    enableKeyEvents: true,
                                                    maxLength: 3,
                                                    maskRe: /[ASR,BSP]/,
                                                    width: 100,
                                                    listeners:{
                                                        keypress: 'onTextKeypress'
                                                    }
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 200},
                                        // <editor-fold defaultstate="collapsed" desc="boxPaginacion2">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-boxPaginacion2',
                                            width: 100,
                                            border: false,
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    cls: 'x-toolbar-pag',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-pag-first2',
                                                            iconCls: 'prx-icon-pagination-first',
                                                            tooltip: 'First Page',
                                                            listeners: {
                                                                click: 'pagFirst'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-pag-previous2',
                                                            iconCls: 'prx-icon-pagination-previous',
                                                            tooltip: 'Previous Page',
                                                            listeners: {
                                                                click: 'pagPrevious'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-pag-next2',
                                                            iconCls: 'prx-icon-pagination-next',
                                                            tooltip: 'Next Page',
                                                            listeners: {
                                                                click: 'pagNext'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btn-pag-last2',
                                                            iconCls: 'prx-icon-pagination-last',
                                                            tooltip: 'Last Page',
                                                            listeners: {
                                                                click: 'pagLast'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'pagingtoolbar',
                                                            id: prototype.id + '-paggin2',
                                                            pageSize: 10,
                                                            border: false,
                                                            displayInfo: false,
                                                            hidden: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 7},
                                        // <editor-fold defaultstate="collapsed" desc="buttons">
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-BtnSendMailFOB',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="color:#000;background:#024F79;color:white;">Send</strong>',
                                            border: true,
                                            scale: 'medium',
                                            listeners:{
                                                click: 'onSendMailClick'
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'button',
                                            id:prototype.id+'-BtnAcuseFOB',
                                            style: 'font-weight:bold;background:#024F79;',
                                            html: '<strong style="color:#000;background:#024F79;color:white;">Acuse</strong>',
                                            border: true,
                                            scale: 'medium',
                                            listeners:{
                                                click: 'onAcuseFOBClick'
                                            }
                                        },
                                        // </editor-fold>
                                        {xtype: 'tbspacer', width: 20},
                                        // <editor-fold defaultstate="collapsed" desc="options">
                                        {
                                            xtype: 'panel',
                                            border: true,
                                            items: [
                                                {
                                                    xtype: 'toolbar',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnSearch2',
                                                            iconCls: 'prx-icon-search',
                                                            tooltip: 'Search',
                                                            listeners: {
                                                                click: 'btnSearch_click'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnFilter2',
                                                            iconCls: 'prx-icon-filter',
                                                            tooltip: 'Display filter',
                                                            listeners: {
                                                                click: 'btnFilter_click'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnExcel2',
                                                            iconCls: 'prx-icon-excel',
                                                            tooltip: 'Export to Excel',
                                                            listeners: {
                                                                click: 'btnExcel_click'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnClear2',
                                                            iconCls: 'prx-icon-clear',
                                                            tooltip: 'Clear Options',
                                                            listeners: {
                                                                click: 'btnClear_click'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: prototype.id + '-btnBack2',
                                                            iconCls: 'prx-icon-back',
                                                            tooltip: 'Back',
                                                            listeners: {
                                                                click: 'btnBack_click'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    border: false,
                                    height: 550,
                                    layout: {
                                        type: 'vbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        width: 1360
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridDataTkt">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id + '-gridDataTkt',
                                            height: 520,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'Src.', dataIndex: 'A1776FUENT', width: 35
                                                    },
                                                    {
                                                        text: 'Iata', dataIndex: 'A1776IATA', width: 65
                                                    },
                                                    {
                                                        text: 'Ticket', dataIndex: 'TKT', width: 95
                                                    },
                                                    {
                                                        text: 'Cpn', dataIndex: 'A1776CUPON', width: 37
                                                    },
                                                    {
                                                        text: 'Issue<br>Date', dataIndex: 'A1776FECVT', width: 64
                                                    },
                                                    {
                                                        text: 'Trx', dataIndex: 'A1776TRNCU', width: 50
                                                    },
                                                    {
                                                        text: 'From', dataIndex: 'A1776ORIG', width: 48
                                                    },
                                                    {
                                                        text: 'To', dataIndex: 'A1776DEST', width: 48
                                                    },
                                                    {
                                                        text: 'Carr', dataIndex: 'A1776CARR', width: 48
                                                    },
                                                    {
                                                        text: 'Flight', dataIndex: 'A1776NVLO', width: 50
                                                    },
                                                    {
                                                        text: 'Fare Basis', dataIndex: 'A1776FBAS', width: 85
                                                    },
                                                    {
                                                        text: 'Class', dataIndex: 'A1776CLAS', width: 49
                                                    },
                                                    {
                                                        text: 'IT Tour<br>Code', dataIndex: 'A1776CODIT', width: 75
                                                    },
                                                    {
                                                        text: 'Curr', dataIndex: 'A1776MDALC', width: 54
                                                    },
                                                    {
                                                        text: 'Fare<br>Cpn On', dataIndex: 'FARE_ON', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Fare<br>Cpn Off', dataIndex: 'FARE_OFF', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Comm<br>HOT On', dataIndex: 'A1776CHON', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Comm<br>HOT Off', dataIndex: 'A1776CHOFF', width: 60,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: '%', dataIndex: 'A1776PCSC', width: 40,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Rate<br>Pay', dataIndex: 'A1776GTCAM', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00000');
                                                        }
                                                    },
                                                    {
                                                        text: 'GSA<br>AM<br>Comm', dataIndex: 'A1776GPAGC', width: 55,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Curr<br>GSA', dataIndex: 'A1776GMDAP', width: 50
                                                    },
                                                    {
                                                        text: 'FOP', dataIndex: 'A1776CFOP', width: 50
                                                    },
                                                    {
                                                        text: 'Ap.', dataIndex: 'A1776APLIC', width: 35
                                                    },
                                                    {
                                                        text: 'Ind.', dataIndex: 'A1776INDI', width: 35
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="pie2">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-pie2',
                                            width: 1358,
                                            border: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: true
                                            },
                                            padding: '1px 0px 1px 0px',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    width: 1358,
                                                    height: 25,
                                                    layout: {
                                                        type: 'hbox',
                                                        pack: 'center'
                                                    },
                                                    defaults: {
                                                        xtype: 'label',
                                                        margin: '3px 0px 0px 5px'
                                                    },
                                                    items: [
                                                        {
                                                            text: 'Page',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-currentPage2',
                                                            text: '1',
                                                            width: 50
                                                        },
                                                        {
                                                            text: 'Of',
                                                            width: 50
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-pageCount2',
                                                            text: '0',
                                                            width: 50
                                                        },
                                                        {xtype: 'tbspacer', width: 100},
                                                        {
                                                            text: 'Total found',
                                                            width: 80
                                                        },
                                                        {
                                                            id: prototype.id + '-lbl-total2',
                                                            text: '0',
                                                            width: 50
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                        // </editor-fold>
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems:[
    ]
});