Ext.define('Ext.Praxis.view.sales.ConsortiumCommissionsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxSearchFilter">
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: prototype.widthContenedor,
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        xtype: 'textfield',
                        hidden: false,
                        selectOnFocus: true,
                        enableKeyEvents: true,
                        enforceMaxLength: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                padding: '5px 1px 5px 1px',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                xtype: 'textfield',
                                hidden: false,
                                selectOnFocus: true,
                                enableKeyEvents: true,
                                enforceMaxLength: true
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    html: 'Search By',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    style: 'font-weight:bold;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 15},
                                {
                                    xtype: 'label',
                                    html: 'Type: ',
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '8px 7px 8px 0px'
                                },
                                {xtype: 'tbspacer', width: 3},
                                {
                                    xtype:'combo',
                                    id: prototype.id + '-cbxType',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
//                                            ["", "Select"],
                                            ["C", "Commissions"]
//                                            ["S", "Positive balance"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    hiddenLabel: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 120,
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners:{
                                        afterrender: function (cmp, eOpts) {
                                            cmp.setValue("");
                                        },
                                        keyup: function (combo, e) {
                                            var key = String.fromCharCode(e.getKey());
                                            var filter = /^[a-zA-Z]+$/;
                                            var test_bool = filter.test(key);
                                            if (test_bool) {
                                                combo.doQuery(key);
                                            }
                                        }
                                    }
                                },
                                {xtype: 'tbspacer', width: 8},
                                {
                                    xtype: 'button',
                                    text: '<strong style="color:black;font-size:11px;">Start Process</strong>',
                                    id: prototype.id + '-btnProccess',
                                    widht: 80,
                                    scale: 'small',
                                    listeners: {
                                        click: 'onProccessClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                labelStyle: 'font-weight:bold;',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                xtype: 'textfield',
                                hidden: false,
                                selectOnFocus: true,
                                enableKeyEvents: true,
                                enforceMaxLength: true
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="boxFile1">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxFile1',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'button',
                                            text: '<strong style="color:black;font-size:11px;">File 1</strong>',
                                            id: prototype.id + '-btnDownloadFile',
                                            hidden: true,
                                            widht: 80,
                                            scale: 'small',
                                            padding: '5px 0px 5px 0px',
                                            listeners: {
                                                click: 'onDownloadFileClick'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                
                                // <editor-fold defaultstate="collapsed" desc="boxFile1">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-boxFile2',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent',
                                    defaults: {
                                        labelStyle: 'font-weight:bold;'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'button',
                                            text: '<strong style="color:black;font-size:11px;">File 2</strong>',
                                            id: prototype.id + '-btnDownloadFile2',
                                            hidden: true,
                                            widht: 80,
                                            scale: 'small',
                                            padding: '5px 0px 5px 0px',
                                            listeners: {
                                                click: 'onDownloadFile2Click'
                                            }
                                        }
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});