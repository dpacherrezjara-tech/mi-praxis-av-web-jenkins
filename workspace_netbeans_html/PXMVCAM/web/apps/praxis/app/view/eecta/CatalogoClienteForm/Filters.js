Ext.define('Ext.Praxis.view.eecta.CatalogoClienteForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            bodyStyle: 'background: transparent',
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
                                anchor: '100%'
                            },
                            items: [
//                                {xtype: 'tbspacer', width: 7},
//                                {
//                                    xtype: 'label',
//                                    text: 'Filter by:',
//                                    padding: '9 0 0 0',
//                                    width: 70
//                                },
//                                {xtype: 'tbspacer', width: 4},
//                                {
//                                    xtype: 'label',
//                                    text: '(*)',
//                                    style: 'color:#9C1717;',
//                                    padding: '9 0 0 0',
//                                    autoEl: {
//                                        tag: 'label',
//                                        'data-qtip': 'Mandatory Field'
//                                    }
//                                },
//                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbfiltro',
                                    fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["1", "Código"],
                                            ["2", "Nombre"]
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
                                    width: 240,
                                    height: 28,
                                    value: "1",                                    
                                    listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    padding: '6 0',
                                    listeners: {
                                        //focus: function(combo) {
                                        //    combo.expand();
                                        //},
                                        //keypress: 'onTextKeypress',
                                        change: 'cmbfiltro_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter01">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter01',
                                    border: false,
                                    hidden:false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtCDCLI',
                                            fieldLabel: 'Código Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 210,
                                            height: 28,
                                            maskRe: /[0-9]/,
                                            value:'1411',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter02',
                                    hidden: true,
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',                                    
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtPARAM1',
                                            fieldLabel: 'Nombre Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,                                                                                        
                                            width: 300,
                                            height: 28,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        }                                        
                                    ]
                                }
                                // </editor-fold>
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});