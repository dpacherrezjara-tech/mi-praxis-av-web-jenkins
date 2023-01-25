/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.DownloadbsplinkForm.DataEntryDownloadbsplink', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idDataEntryDownload + '-DownloadbsplinkForm',
    controller: prototype.idDataEntryDownload + '-DataEntryDownloadbsplinkController',
    requires: [
        'Ext.Praxis.controller.salesaudit.DownloadbsplinkForm.DataEntryDownloadbsplinkController'
    ],
    title: 'PROCESSED BSPLINK',
    header: true,
    width: 400,
    height: 300,
    id: prototype.idDataEntryDownload + '-win-DataEntryDownloadbsplink',
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idDataEntryDownload + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    margin: '5 20 5 2',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            // bodyStyle: 'background: #E5ECEF',
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'label',
                                            labelAlign: 'left',
                                            width: 120,
                                            padding: '2px 5px 2px 10px',
                                            html: '<strong style="color:#000;  ">Processing Date</strong>'

                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDataEntryDownload + '-txtcountry',
                                            fieldLabel: 'Country',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 2,
                                            enforceMaxLength: 2,
                                            labelWidth: 50,
                                            width: 110,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.idDataEntryDownload + '-txtFTE',
                                            fieldLabel: 'Source',
                                            maskRe: /[A-Z,a-z,Ñ,ñ]/,
                                            maxLength: 3,
                                            enforceMaxLength: 3,
                                            labelWidth: 50,
                                            width: 110,
                                            readOnly: true
                                        },
                                        {xtype: 'textfield',
                                            id: prototype.idDataEntryDownload + '-txtFCONT',hidden:true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'column',
                                    margin: '1 0 1 0',
                                    border: false,
                                    // bodyStyle: 'background: #E5ECEF',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            id: prototype.idDataEntryDownload + '-gridDataEntry',
                                            width: 390,
                                            height: 290,
                                            columnLines: true,
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {text: 'Country', dataIndex: 'PAIS', width: 150},
                                                    {text: 'Source', dataIndex: 'FTE', width: 100},
                                                    {
                                                        sortable: false,
                                                        xtype: 'actioncolumn',
                                                        text: '',
                                                        width: 40,
                                                        align: 'center',
                                                        items: [
                                                            {
                                                                icon: 'resources/img/botones/check.png',
                                                                tooltip: 'Select',
                                                                handler: 'onSelectClick'
                                                            }
                                                        ]
                                                    }



                                                    //

                                                ], listeners: {
                                                    beforecellmousedown: function () {
                                                        return false;
                                                    }
                                                }
                                            }, viewConfig: {
                                                //trackOver: false,
                                                stripeRows: true,
                                                enableTextSelection: true
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
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '5 100 10 10',
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Processed',
                    id: prototype.idDataEntryDownload + '-btn-save',
                    icon: 'resources/img/botones/download.png', //process_load
                    //hidden: true,
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.idDataEntryDownload + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});