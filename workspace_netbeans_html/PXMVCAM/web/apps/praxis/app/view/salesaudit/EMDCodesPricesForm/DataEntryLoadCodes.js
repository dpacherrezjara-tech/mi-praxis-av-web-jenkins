Ext.define('Ext.Praxis.view.salesaudit.EMDCodesPricesForm.DataEntryLoadCodes',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLoadCodesEMDCodesPricesForm',

    controller: 'DataEntryLoadCodesEMDCodesPricesController',

    requires:[
        'Ext.Praxis.controller.salesaudit.EMDCodesPrices.DataEntryLoadCodesEMDCodesPricesController'
    ],

    title:'Load EMD Codes and Prices',
    header:true,
    height:150,
    width:550,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,
    bodyStyle: 'background-color: white;',
    defaults:{
        border: false
    },

    items:[
        {
            xtype: 'form',
            layout: 'vbox',
            border: true,
            padding: '14 0',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {xtype: 'tbspacer', height: 17},
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    width: '100%',
                    items:[
                        { xtype: 'tbspacer', width: 3 },
                        {
                            xtype: 'filefield',
                            id: prototype.id + '-txtRutaExcel',
                            fieldLabel: '<strong>Upload File Format<strong>',
                            labelSeparator: ':',
                            labelWidth: 135,
                            allowBlank: true,
                            accept: '.csv',
                            margin: '2 4 2 4',
                            width: 397,
                            listeners:{
                                change: 'btnUpload_clickHandler'
                            },
                            regex: /(.)+((\.csv)(\w)?)$/i,
                            regexText: 'Only CSV format is accepted',
                            buttonConfig: {
                                text : '<strong>Upload</strong>',
                                width: 80,
//                                cls: 'x-btn-upload x-btn-upload-txt',
//                                overCls: 'x-btn-upload-hover x-btn-upload-txt-hover'
                            }
                        },
                        {
                            xtype: 'button',
                            id:prototype.id+'-btnSave',
                            html: '<strong>Save</strong>',
                            border: true,
                            margin: '2 0 2 0',
                            width: 80,
                            listeners:{
                                click: 'btnSave_clickHandler'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});