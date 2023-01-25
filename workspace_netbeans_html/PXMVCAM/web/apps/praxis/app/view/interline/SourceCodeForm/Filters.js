Ext.define('Ext.Praxis.view.interline.SourceCodeForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthContenedor,
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '6 0 6 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    html: 'Group Code:',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 20},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPERNUM',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["1", "01 - Prime Source Code"], ['2', "02 - Rejections Coupons"], ['3', "03 - Rejections FIM's"], ['4', "04 - Rejections Frequent Flyer"],
                                            ['5', "05 - Billing Memo's"], ['6', "06 - Sampling Related"], ['7', "07 - Credit Memo"], ['8', "08 - Optional Codes Bilateral"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: true,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 187,
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    listeners: {
                                        afterrender: function (combo, eOpts) {
                                            combo.setValue("");
                                        },
//                                        focus: function(combo) {
//                                            combo.expand();
//                                        },
                                        keypress: 'onTextKeypress'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});