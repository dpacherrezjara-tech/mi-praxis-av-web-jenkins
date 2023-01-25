/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 * Migrado por: Zenobio Perez
 */
Ext.define('Ext.Praxis.view.salesaudit.ADMReportForm.FormUnicoSeguimieto', {
    extend: 'Ext.window.Window',
    alias: 'widget.FormUnicoSeguimieto',
    controller: 'FormUnicoSeguimietoController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ADMReport.FormUnicoSeguimietoController'
    ],
    title: 'ADM TRACING',
    header: true,
    id: prototype.id4 + '-win',
    height: 400,
    width: 850,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.id4 + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id4 + '-gridSeguimieto',
                            width: 800,
                            height: 200,
                            autoScroll: true,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Type', dataIndex: 'A2553TYPO', width: 100, align: 'left'},
                                    {text: 'Service agent', dataIndex: 'A2553REGIS', width: 100, align: 'left'},
                                    {text: 'Date', dataIndex: 'A2553FREGI', width: 80, align: 'left'},
                                    {text: 'Time', dataIndex: 'A2553HREGI', width: 80, align: 'left'},
                                    {text: 'Status', dataIndex: 'ESTADO', width: 150, align: 'left'},
                                    {text: 'Description', dataIndex: 'A2553DESCR', flex: 1, align: 'center',
                                        listeners: {
                                            click: 'metadata_detalle'
                                        },renderer: function(value, metadata) {
                                            metadata.tdAttr = 'data-qtip="' + value + '"';
                                            return value;
                                        }
                                    }
                                   // {text: 'File',dataIndex: 'A2553ARCHV',width: 100,renderer: 'OnColumnAuditorRenderer'}
                                    /*{text: 'File', dataIndex: 'A2553ARCHV', width: 90, cls: 'column_header_double', align: 'center',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var str = '';
                                            if (value != '') {
                                                str = "Download file";
                                            }
                                            else {
                                            }
                                            return '<a href="#"  ' + str + '</a>';
                                        }

                                    }*/
                                    
                                ]
                            }, viewConfig: {
                                //trackOver: false,
                                stripeRows: true,
                                enableTextSelection: true
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    defaults: {
                        bodyStyle: 'background: transparent'
                    },
                    items: [{
                            xtype: 'textareafield',
                            id: prototype.id4 + '-Disputa',
                            labelWidth: 85,
                            width: 800,
                            height: 80, readOnly: true,
                            grow: true,
                            name: 'Disputa',
                            fieldLabel: 'Disputa'
                        }

                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    icon: 'resources/img/botones/24x24/1337983423_Cancel__Red.png',
                    text: 'Close',
                    height: 30,
                    scale: 'medium',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            layout: {
                pack: 'left'
            },
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    icon: 'resources/img/botones/16x16/1400209639_25.png',
                    text: 'Load file',
                    height: 30,
                    id: prototype.id4 + '-BtnLoad',
                    scale: 'medium',
                    listeners: {
                        click: 'onClickLoad'
                    }
                }
            ]
        }
    ]
});


