prototype.idDErej = prototype.id + '-RejectSequencesDataEntry';

Ext.define('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.RejectSequencesDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.RejectSequencesDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.HeadersReport.RejectSequencesDataEntryController'
    ],
    controller: 'RejectSequencesDataEntryController',
    title: 'Reject Header - Form',
    header: true,
    width: 600,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: {
        xtype: 'form',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        border: true,
        width: '100%',
        bodyPadding: 5,
        items: [
            {
                xtype: 'label',
                text: 'Are you sure to save this Header?',
                style: {
                    fontSize: '14px',
                    color: 'red',
                    fontWeight: 'bold',
                    marginTop: '10px',
                    marginBottom: '10px'
                }
            },
            {
                xtype: 'checkbox',
                boxLabel: 'Re-Process',
                id: prototype.idDErej + '-chk-reject-all',
                inputValue: '1',
                checked: false,
                hidden: true
            }
        ]
    },
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
                    text: 'Reject',
                    iconCls: 'prx-icon-image-process',
                    listeners: {
                        click: 'onRejectClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDErej + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});