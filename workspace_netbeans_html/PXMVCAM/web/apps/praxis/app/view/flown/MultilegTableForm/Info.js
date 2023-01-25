/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.MultilegTableForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1300,
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    height: 510,
                    hidden: false,
                    columnLines: true,                     
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr',  width: 50, dataIndex: 'RN'},
                            {text: 'Flight Date', width: 90, dataIndex: 'strFormatDate'},
                            {text: 'ZULU Date',  width: 90, dataIndex: 'strFormatDate2'},
                            {text: 'Flight ' + '<br/>' + ' Number', width: 70, dataIndex: 'NFLIGHT'},
                            {text: 'Sales Data',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true,
                                    width: 110
                                },
                                columns: [
                                    {text: 'Orig',  width: 50, dataIndex: 'CDEPART',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var font = record.data.FEUP === 'bold' ? record.data.FEUP : 'normal';
                                            var color = record.data.CCUST.replace('0x', '#');
                                            metaData.style = "font-weight:" + (font) + ";color:" + color;
                                            metaData.tdAttr = 'data-qtip="' + (colIndex === 4 ? record.data.strDescripcionCDEPART : record.data.strDescripcionCARRIVA)+'"';
                                            return value;
                                        }},
                                    {text: 'Dest',  width: 50, dataIndex: 'CARRIVA',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var font = record.data.FEUP === 'bold' ? record.data.FEUP : 'normal';
                                            var color = record.data.CCUST.replace('0x', '#');
                                            metaData.style = "font-weight:" + (font) + ";color:" + color;
                                            metaData.tdAttr = 'data-qtip="' + (colIndex === 4 ? record.data.strDescripcionCDEPART : record.data.strDescripcionCARRIVA+'"');
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Leg1',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true,
                                    width: 140
                                },
                                columns: [
                                    {text: 'Orig',width: 50, dataIndex: 'DEPARTLEG1',
                                        renderer: function(value, metaData, record) {
                                            var tool = record.data['strDescripcionDEPARTLEG1'].trim();
                                            console.log("tool : "+tool);
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                             
                                            }
                                            return value;
                                        }},
                                    {text: 'Dest',  width: 50, dataIndex: 'ARRIVALEG1',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['strDescripcionARRIVALEG1'].trim();
                                            if (tool.length > 0) {
                                               metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Carrier',  width: 70, dataIndex: 'CARR1',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['MATRIC1'].trim();
                                            if (tool.length > 0) {
                                               metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Leg2',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true,
                                    width: 140
                                },
                                columns: [
                                    {text: 'Orig', width: 50, dataIndex: 'DEPARTLEG2',
                                        renderer: function(value, metaData, record) {
                                            var tool = record.data['strDescripcionDEPARTLEG2'].trim();
                                            if (tool.length > 0) {
                                               metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Dest',  width: 50, dataIndex: 'ARRIVALEG2',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['strDescripcionARRIVALEG2'].trim();
                                            if (tool.length > 0) {
                                               metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Carrier', width: 70, dataIndex: 'CARR2',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['MATRIC2'].trim();
                                            if (tool.length > 0) {
                                               metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Leg3',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true,
                                    width: 140
                                },
                                columns: [
                                    {text: 'Orig',  width: 50, dataIndex: 'DEPARTLEG3',
                                        renderer: function(value, metaData, record) {
                                            var tool = record.data['strDescripcionDEPARTLEG3'].trim();
                                            if (tool.length > 0) {
                                               metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Dest', width: 50, dataIndex: 'ARRIVALEG3',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['strDescripcionARRIVALEG3'].trim();
                                            if (tool.length > 0) {
                                               metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Carrier',  width: 70, dataIndex: 'CARR3',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['MATRIC3'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }}

                                ]
                            },
                            {text: 'Leg4',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true,
                                    width: 140
                                },
                                columns: [
                                    {text: 'Orig', width: 50, dataIndex: 'DEPARTLEG4',
                                        renderer: function(value, metaData, record) {
                                            var tool = record.data['strDescripcionDEPARTLEG4'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Dest', width: 50, dataIndex: 'ARRIVALEG4',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['strDescripcionARRIVALEG4'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Carrier',  width: 70, dataIndex: 'CARR4',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['MATRIC4'].trim();
                                            if (tool.length > 0) {
                                               metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }}
                                ]
                            },
                            {text: 'Leg5',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true,
                                    width: 140
                                },
                                columns: [
                                    {text: 'Orig',  width: 50, dataIndex: 'DEPARTLEG5',
                                        renderer: function(value, metaData, record) {
                                            var tool = record.data['strDescripcionDEPARTLEG5'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Dest',  width: 50, dataIndex: 'ARRIVALEG5',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['strDescripcionARRIVALEG5'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }},
                                    {text: 'Carrier',  width: 70, dataIndex: 'CARR5',
                                        renderer: function(value, metaData, record) {

                                            var tool = record.data['MATRIC5'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "'+tool+'"';
                                            }
                                            return value;
                                        }}
                                ]
                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 50,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    }
                                ]
                            }
                        ]
                    }
                }
                ,
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 5px 0px 5px'
                    },
                    padding: '1px 5px 1px 5px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1300,
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
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

