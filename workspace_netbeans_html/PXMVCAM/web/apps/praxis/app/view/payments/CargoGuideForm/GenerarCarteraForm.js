Ext.define('Ext.Praxis.view.payments.CargoGuideForm.GenerarCarteraForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.GenerarCarteraForm',
    requires: [
        'Ext.Praxis.controller.payments.CargoGuide.GenerarCarteraController'
    ],
    controller: 'GenerarCarteraController',
    title: 'Generar Conciliacion',
    header: true,
    width: 460,
    height: 215,
    resizable: false,
    modal: true,
    border: false,
    layout: {type: 'vbox', align: 'stretch'},
    defaults: {border: false},
    items: [
        {
            xtype: 'container',
            flex: 1,
            padding: '10 14 8 14',
            layout: {type: 'vbox', align: 'stretch'},
            items: [
                {
                    xtype: 'container',
                    html: '<div style="background:linear-gradient(90deg,#1565C0,#1976D2);color:#fff;font-size:11px;font-weight:bold;letter-spacing:2px;padding:5px 14px;border-radius:4px 4px 0 0;">&#9632;&nbsp;FILTER</div>'
                },
                {
                    xtype: 'container',
                    style: 'background:#fff;border:1px solid #BBDEFB;border-top:none;border-radius:0 0 4px 4px;box-shadow:0 1px 3px rgba(0,0,0,.07);',
                    padding: '12 14 10 14',
                    layout: {type: 'vbox', align: 'stretch'},
                    defaults: {margin: '0 0 10 0'},
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cart-cmbCountry',
                            fieldLabel: 'Country',
                            labelStyle: 'font-weight:bold;color:#37474F;font-size:11px;',
                            labelWidth: 70,
                            width: 380,
                            emptyText: '-- Select --',
                            queryMode: 'local',
                            forceSelection: true,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            fieldStyle: 'text-align:center;font-weight:bold;color:#1565C0;',
                            store: {
                                fields: ['code', 'name'],
                                data: [
                                    {code: 'CO', name: 'Colombia (CO)'},
                                    {code: 'HN', name: 'Honduras (HN)'},
                                    {code: 'SV', name: 'El Salvador (SV)'}
                                ]
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-cart-txtSFile',
                            fieldLabel: 'SFILE',
                            labelStyle: 'font-weight:bold;color:#37474F;font-size:11px;',
                            labelWidth: 70,
                            width: 380,
                            emptyText: 'e.g. RV-QT-04142026-EXPORT-MDE.txt',
                            margin: '0 0 0 0'
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        padding: '6 0',
        layout: {pack: 'center'},
        defaults: {scale: 'medium'},
        items: [
            {
                text: '&#8659;&nbsp;Download Excel',
                style: 'background:#1565C0;border:1px solid #0D47A1;color:#fff;font-weight:bold;border-radius:3px;',
                listeners: {click: 'onDownloadClick'}
            },
            {xtype: 'tbspacer', width: 10},
            {
                text: 'Cancel',
                iconCls: 'prx-icon-cancel',
                listeners: {click: 'onCancelClick'}
            }
        ]
    }]
});
