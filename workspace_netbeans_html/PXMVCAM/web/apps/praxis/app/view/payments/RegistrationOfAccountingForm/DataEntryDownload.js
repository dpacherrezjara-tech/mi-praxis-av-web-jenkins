Ext.define('Ext.Praxis.view.payments.RegistrationOfAccountingForm.DataEntryDownload', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDownload',
    requires: [
        'Ext.Praxis.controller.payments.RegistrationOfAccounting.DataEntryRegistrationOfAccountingController'
    ],
    controller: 'DataEntryRegistrationOfAccountingController',
    title: 'Download files',
    header: true,
    width: 550,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id01 + '-DataEntry-center',
            border: false,
            padding: '5 0 0 0',
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id01 + '-form01',
                    layout: 'hbox',
                    width: '100%',
                    padding: '5 0 0 0',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id01 + '-form-radiofields',
                            layout: 'vbox',
                            border: false,
                            margin: '5 5 1 1',
                            width: 150,
                            items: [
//                                {
//                                    xtype: 'radiofield',
//                                    id: prototype.id01 + '-op01',
//                                    name: prototype.id01 + '-op',
//                                    boxLabel: 'File 1',
//                                    margin: '2 2 2 10',
//                                    checked: true
//                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'label',
                    padding: '0 0 0 5',
                    html: '<font color="green"><h3 id="GenerationOfAccountingFormMsg">Select a file to download.</h3></font>'
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            border: true,
            ui: 'footer',
            margin: '1 1 1 1', // left/right/top/botton
            defaults: {
                scale: 'medium'
            },
            style: 'aling:center padding: 5px;',
            items: [
                {
                    text: 'Download',
                    id: prototype.id01 + '-btn-download',
                    iconCls: 'prx-icon-download',
                    listeners: {
                        click: 'onDownloadFilesClick'
                    }
                },
                {
                    text: 'Close',
                    id: prototype.id01 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);