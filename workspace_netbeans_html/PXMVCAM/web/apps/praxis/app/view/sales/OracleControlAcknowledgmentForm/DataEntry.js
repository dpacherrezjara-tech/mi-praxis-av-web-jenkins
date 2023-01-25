prototype.Leg = {
    id: 'DataEntry'
};
Ext.define('Ext.Praxis.view.sales.OracleControlAcknowledgmentForm.DataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntry',
    requires: [
        'Ext.Praxis.controller.sales.OracleControlAcknowledgment.DataEntryController'
    ],
    controller: 'DataEntryController',
    title: 'Oracle Control Acknowledgement - Data Entry Form',
    header: true,
    width: 1000,
    height: 500,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            xtype: 'panel',
            border: true,
            autoScroll: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelTicket',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtStatus',
                            required: true,
                            editable: false,
                            fieldLabel: 'Status',
                            width: 135,
                            labelWidth: 45,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'left'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtOracleID',
                            required: true,
                            editable: false,
                            fieldLabel: 'Oracle ID',
                            width: 150,
                            labelWidth: 80,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtAccountDate',
                            required: true,
                            editable: false,
                            fieldLabel: 'Accouting Date',
                            width: 170,
                            labelWidth: 100,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRegDate',
                            required: true,
                            editable: false,
                            fieldLabel: 'Date',
                            width: 150,
                            labelWidth: 60,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtRegHour',
                            required: true,
                            editable: false,
                            fieldLabel: 'Hour',
                            width: 110,
                            labelWidth: 60,
                            maskRe: /[]/,
                            fieldStyle: 'text-align: center;',
                            labelAlign: 'right'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.Leg.id+'-boxCpnInfo',
                    hidden: false,
                    width: 1000,
                    height: 180,
                    layout: 'fit',
                    autoScroll: true,
                    bodyStyle: 'background:#E8F9E8',
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="gridLeg">
                        {
                            xtype: 'grid',
                            id: prototype.Leg.id+'-gridLeg',
                            margin: '5 0',
                            bodyStyle: 'background:#E6EFF5',
                            height: 170,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    style: 'font-size:9px'
                                },
                                items: [
                                    {
                                        xtype: 'gridcolumn',
                                        width: 40,
                                        dataIndex: 'RN',
                                        text: '<b style="font-size:9px;text-align:center">Nbr</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 60,
                                        dataIndex: 'A1956POLIZ',
                                        text: '<b style="font-size:9px">Journal</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            if (record.data.strDescRutaO !== "") {
                                                metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaO+'"';
                                            }
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 40,
                                        dataIndex: 'A1956SUBTP',
                                        text: '<b style="font-size:9px">Type</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            if (record.data.strDescRutaD !== "") {
                                                metaData.tdAttr = 'font-size:9px !important";data-qtip="'+record.data.strDescRutaD+'"';
                                            }
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 220,
                                        dataIndex: 'A1956LOTE',
                                        text: '<b style="font-size:9px">Batch ID</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 270,
                                        dataIndex: 'A1956ARCH',
                                        text: '<b style="font-size:9px">File</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 50,
                                        dataIndex: 'A1956TRCAR',
                                        text: '<b style="font-size:9px">Lines</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 80,
                                        dataIndex: 'A1956ORACL',
                                        text: '<b style="font-size:9px">Oracle ID</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        width: 140,
                                        dataIndex: 'A1956STAT',
                                        text: '<b style="font-size:9px">Status</b>',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "font-size:9px !important";
                                            return value;
                                        }
                                    },
                                    {xtype: 'gridcolumn', text: '<b style="font-size:9px">Messages</b>', width: 75, dataIndex: 'A1956NMSJS',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' color:#008FE3;text-align:center; margin-right:0px ; background:#d5f4d5; ';
                                            return (value!==0 ?  ('<a href="#">' + value + '</a>') : value);
                                        },
                                        listeners: {
                                            click: 'onEditClick'
                                        }
                                    },
                                ]
                            }
                        }
                        //</editor-fold>
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelComment',
                    border: false,
                    layout: {
                                type:'card',
                                hideInactive:false
                            },
                    width: 900,
                    height: 50,
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        //padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            id: prototype.id + '-txtComment',
                            required: true,
                            editable: true,
                            fieldLabel: 'Comment',
                            width: '100%',
                            height: '100%',
                            labelWidth: 65,
                            fieldStyle: 'overflow:scroll; overflow-wrap: normal; white-space:pre; letter-spacing:0.8px; line-height:19.9px; background-color:transparent;text-align:left; color:#2D476A; font-size:11px; font-family:"Courier New";',
                            labelAlign: 'left',
                            margin: '10',
                            inputAttrTpl: [
                                'spellcheck=false'//quitar la autocorreccion (subrayado en rojo)
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelErrorLog',
                    border: false,
                    layout: {
                                type:'card',
                                hideInactive:false
                            },
                    width: 900,
                    height: 160,
                    autoScroll: true,
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        //padding: '8px 4px 8px 4px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            width: '100%',
                            height: '100%',
                            id: prototype.id + '-txtErrorLog',
                            fieldLabel: 'Error log',
                            //margin: '5',
                            //autoScroll: true,
                            labelWidth: 65,
                            labelAlign: 'left',
                            fieldStyle: 'overflow:scroll; overflow-wrap: normal; white-space:pre; letter-spacing:0.8px; line-height:19.9px; background-color:transparent;text-align:left; color:#2D476A; font-size:11px; font-family:"Courier New";',
                            margin: '10',
                            inputAttrTpl: [
                                'spellcheck=false'//quitar la autocorreccion (subrayado en rojo)
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});