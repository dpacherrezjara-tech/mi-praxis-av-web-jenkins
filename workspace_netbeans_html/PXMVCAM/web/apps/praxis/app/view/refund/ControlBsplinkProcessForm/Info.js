

Ext.define('Ext.Praxis.view.refund.ControlBsplinkProcessForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #E3EAEF;border: none;',

    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '20px 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1180,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMainAvianca',
                            bodyStyle: 'background: transparent;',
                            hidden: false,
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            defaults: {
                                border: false,
                                height: 560
                            },
                            items: [
                                {
                                    xtype: 'grid',
//                                    cls: 'gridCss',
                                    id: prototype.id + '-gridDataAvianca',
                                    bodyStyle: 'background: transparent;',
                                    width: 772, 
                                    columnLines: false,
                                    enableColumnMove: false,
                                    hidden: false,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            
                                           
                                            {text: 'Status BSPLINK Change Status',style: 'background: #6A95AF; border-color:white !important',
                                                columns: [
                                                    {text: 'Load Date', width: 140, dataIndex: 'A3096DAUTH', align: 'center',style: 'background: #6A95AF; border-color:white !important',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            let secuencia = record.raw.A3096RBT1 || '00';
                                                            metaData.style = 'text-align:right;';
                                                           return '<span href="#" style="font-weight:bold;">'
                                                            + value + ' - ' + secuencia +
                                                           '</span>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                    return '';
                                                }},
                                            {text: 'File Date', width: 110, dataIndex: 'FILEFCAR', align: 'center',style: 'background: #6A95AF; border-color:white !important',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.style = 'margin-top: 1px;';
                                                                if (!value) return '';

                                                                // Convierte '20250810' → '10 OCT 25'
                                                                const year = value.substring(2, 4);        // '25'
                                                                const month = value.substring(4, 6);       // '08'
                                                                const day = value.substring(6, 8);         // '10'

                                                                const meses = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
                                                                const mesTexto = meses[parseInt(month, 10) - 1];

                                                                const fechaFormateada = `${day} ${mesTexto} ${year}`;

                                                                return `<span style="color:#0D1117;font-weight:bold;">${fechaFormateada}</span>`;
                                                            },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                    return '';
                                                }},
                                                     {text: 'Total', width: 90, dataIndex: 'QTY_TOTAL_TICKETS',style: 'background: #6A95AF; border-color:white !important;text-align:center',
                                                        listeners: {
                                                            click: 'onClickDetailAvianca',
                                                            args: ['']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;';
                                                            return '<a href="#" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + Ext.util.Format.number(value, '0,000') + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAvianca').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                            return Ext.util.Format.number(data.totTOTAL_TICKETS, '0,000');
                                                        }
                                                    },
                                                    {text: 'Pending', width: 80, dataIndex: 'QTY_PENDIENTE',style: 'background: #6A95AF; border-color:white !important;text-align:center',
                                                        listeners: {
                                                            click: 'onClickDetailAvianca',
                                                            args: ['P']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#d5f4d5;';
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAvianca').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                            return Ext.util.Format.number(data.totPENDIENTE, '0,000');
                                                        }
                                                    },
                                                    {text: 'Approved', width: 90, dataIndex: 'QTY_AUTORIZADO',style: 'background: #6A95AF; border-color:white !important;text-align:center',
                                                        listeners: {
                                                            click: 'onClickDetailAvianca',
                                                            args: ['F']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#d5f4d5;';
                                                           return '<a href="#" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAvianca').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                            return Ext.util.Format.number(data.totAUTORIZADO, '0,000');
                                                        },
                                                    },
                                                    {text: 'Rejected', width: 90, dataIndex: 'QTY_RECHAZADO',style: 'background: #6A95AF; border-color:white !important;text-align:center',
                                                        listeners: {
                                                            click: 'onClickDetailAvianca',
                                                            args: ['R']
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = 'text-align:right;background:#d5f4d5;';
                                                            return '<a href="#" style="color:#057ECB;text-decoration:underline;font-weight:bold;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAvianca').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                            return Ext.util.Format.number(data.totRECHAZADO, '0,000');
                                                        }
                                                    },
                                                    {text: 'Processed', width: 160, dataIndex: 'A3096PROCESSED',style: 'cursor: pointer;background: #6A95AF; border-color:white !important;text-align:center',
                                                       
                                                        align: 'center',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (value === 'P') {
                                                                    metaData.style = 'background-color: #FFC107; color: white; font-weight: bold;cursor: pointer;';
                                                                    return 'Pending';
                                                                } else {
                                                                    metaData.style = 'background-color: #28A745; color: white !important; font-weight: bold;cursor: pointer;';
                                                                    return 'Finished';
                                                                }
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataAvianca').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right;background: #6A95AF; border-right:1px solid white !important;color:white;font-weight:bold';
                                                            return '';
                                                        },
                                                         listeners: {
                                                            click: 'changeStatusReview'
                                                        },
                                                    }

                                                ]
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
}
);


