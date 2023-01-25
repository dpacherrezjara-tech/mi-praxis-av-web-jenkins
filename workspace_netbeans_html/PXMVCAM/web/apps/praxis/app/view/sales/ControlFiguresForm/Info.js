Ext.define('Ext.Praxis.view.sales.ControlFiguresForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ControlFiguresForm-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id+'-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id+'-boxMainData',
                    border: false,
                    width: '100%',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridControlLoadfigRep">
                        {
                            xtype: 'grid',
                            id: prototype.id+'-gridControlLoadfigRep',
                            width: 1175,
                            height: 110,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Group', dataIndex: 'A1530GRUPO', flex: 1,//width: 90,
                                        listeners: {
                                            click: 'execSearchGroupDet'
                                        },
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;font-weight:bold;";
                                            value = '<b>'+value+'</b>';
                                            return '<a href="#sales-control-figures-form" style="color:#244066;text-decoration:underline;">'+value+'</a>';
                                        }
                                    },
                                    {
                                        text: 'Country', dataIndex: 'A1530PSVTA', width: 60
                                    },
                                    {
                                        text: 'Source', dataIndex: 'A1530FUENT', width: 55,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Dist.<br>Channel', dataIndex: 'A1530SFUEN', width: 75
                                    },
                                    {
                                        text: 'City /<br>Bank', dataIndex: 'A1530CIUVT', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'IATA', dataIndex: 'A1530AGENT', width: 65,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Curr', dataIndex: 'A1530MDA', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Ending Date', dataIndex: 'A1530FHAST', width: 90
                                    },
                                    {
                                        text: 'Procesing<br>Date', dataIndex: 'A1530FPROC', width: 90
                                    },
                                    {
                                        text: 'Diff (DB-CR)', dataIndex: 'A1720DIFF', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Accounting<br>Date', dataIndex: 'A1530FCONT', width: 90
                                    },
                                    {
                                        text: 'Accounting Id', dataIndex: 'A1530IDCON', width: 125
                                    },
                                    {
                                        text: 'GL', dataIndex: 'A1530POLGL', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'AR', dataIndex: 'A1530POLAR', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'AP', dataIndex: 'A1530POLAP', width: 50,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A1530STPRO_00', width: 60,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        { xtype: 'tbspacer', height: 2 },
                        {
                            xtype: 'tabpanel',
                            id: prototype.id+'-tabControlfiguresDetail',
                            width: '100%',
                            border: false,
                            autoScroll:true,
                            //padding:'1px 1px 1px 1px',
                            activeTab: 0,
                            defaults: {
                                height: 392, //480
                                border: false,
                                bodyStyle: 'background: transparent;'
                            },
                            enableKeyEvents: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    title: '<label style="color:#0B333C;font-size:12px;">Control Figures</label>',
                                    id: prototype.id+'-boxDatail',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: transparent;'
                                    },
                                    items: [
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    title: '<label style="color:#0B333C;font-size:12px;">Original Values</label>',
                                    id: prototype.id+'-boxDatailOriginal',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: transparent;'
                                    },
                                    items: [
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