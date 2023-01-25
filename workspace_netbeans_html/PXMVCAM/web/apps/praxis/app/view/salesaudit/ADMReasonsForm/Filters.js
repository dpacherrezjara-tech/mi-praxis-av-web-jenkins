Ext.define('Ext.Praxis.view.salesaudit.ADMReasonsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    margin: '2 0',
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
                    width: '100%',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'hbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%',
                                padding: '5 0'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 9},
                                {
                                    xtype: 'label',
                                    text: 'Search By:',
                                    style: 'font-weight:bold;',
                                    width: 95,
                                    padding: '8 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxFiltro',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "Select"], ["A2560COD", "Cod. Reason"], ["A2560FAMILY", "Family"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    editable: false,
                                    value: "",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    width: 100,
                                    enableKeyEvents: true,
                                    listeners: {
                                        change: 'cbxFiltro_clickHandler'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCampo',
                                    fieldStyle: 'text-align:center;',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    hidden: true,
                                    maxLength: 10,
                                    maskRe: /[0-9a-zA-Z]/,
                                    width: 100,
                                    padding: '5 0 5 10',
                                    listeners: {
                                        change: 'onUpperValue',
                                        keypress: 'onTextKeypress'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-txtFamilia',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "ALL"], ["COMISION", "COMISION"], ["CARGOS/PN", "CARGOS/PN"],
                                            ["TARIFA", "TARIFA"], ["FOP", "FOP"], ["TAX", "TAX"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    hidden: true,
                                    editable: false,
                                    value: "",
                                    width: 100,
                                    typeAhead: true,
                                    padding: '5 0 5 10',
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    triggerAction: 'all'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});