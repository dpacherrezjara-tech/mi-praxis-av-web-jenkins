prototype.idDE2 = prototype.id + '-DownloadHeadersDataEntry';

Ext.define('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.DownloadHeadersDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.DownloadHeadersDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.DownloadHeadersDataEntryController',
        'Ext.Praxis.view.widgets.MonthField2'
    ],
    controller: 'DownloadHeadersDataEntryController',
    title: 'Download Report - Form',
    header: true,
    width: 400,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idDE2 + '-mainForm',
            layout: {
                type: 'vbox',
                pack: 'center'
            },
            border: false,
            width: '100%',
            defaults: {
                xtype: 'fieldset',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                border: true,
                margin: '2 2 2 2',
                width: '100%',
                style: {
                    backgroundColor: '#efe5e5'
                },
                defaults: {
                    xtype: 'panel',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    width: '100%',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        xtype: 'textfield',
                        margin: '2 5 2 5',
                        labelStyle: 'text-align:left;font-weight: bolder;',
                        fieldStyle: 'text-align:center;',
                        editable: false
                    }
                }
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Parameters">
                {
                    title: '<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Parameters</span>',
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'monthfield2',
                                    fieldLabel: 'From',
                                    labelWidth: 50,
                                    width: 150,
                                    name: 'IN_PRDAF',
                                    fieldStyle: 'font-weight:bold;text-align:center;'
                                },
                                {
                                    xtype: 'monthfield2',
                                    fieldLabel: 'To',
                                    labelWidth: 30,
                                    width: 130,
                                    name: 'IN_PRDAT',
                                    fieldStyle: 'font-weight:bold;text-align:center;'
                                }
                            ]
                        },
                        // *** NUEVO: panel con el combo Type ***
                        {
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Type',
                                    labelWidth: 50,
                                    width: 200,
                                    name: 'REPORT_TYPE',
                                    id: prototype.idDE2 + '-reportType',
                                    editable: false,
                                    value: 'CREDIT',
                                    store: ['CREDIT', 'CASH'],
                                    fieldStyle: 'font-weight:bold;text-align:center;',
                                    labelStyle: 'text-align:left;font-weight: bolder;'
                                }
                            ]
                        }
                    ]
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium',
                margin: '5 0 5 0'
            },
            items: [
                {
                    text: 'Process',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onProcessClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE2 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});