/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.LoadControlBSPForm.FormatMasterFileForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-FormatMasterFile',
    controller: prototype.id + '-FormatMasterFileController',
    requires: [
        'Ext.Praxis.controller.sales.LoadControlBSP.FormatMasterFileController'
    ],
    title: 'Control Format BSP',
    header: true,
    width: 400,
    height: 140,
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
            id: prototype.id + '-DataEntry-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'vbox',
                    width: 390,
                    margin: '1 1 1 1',
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            margin: '5 0 1 0',
                            border: false,
                            defaults: {
                                width: 390
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    margin: '1 0 1 5',
                                    border: false,
                                    defaults: {
                                        padding: '0px 3px 0px 3px',
                                        labelStyle: 'font-weight:bold;'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 120,
                                            text: 'Enter ID File',
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-de-txtA1698IDFIL',
                                            width: 130,
                                            labelWidth: 0,
                                            style: 'font-weight:bold;text-align:left;',
                                            padding: '1px 5px 5px 8px',
                                            maxLength: 9
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
            bodyStyle: 'background: #E5ECEF',
            items: [
                {
                    text: 'Process',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',                    
                    listeners: {
                        click: 'onSaveClick'
                    }
                },                
                {
                    text: 'Close',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});