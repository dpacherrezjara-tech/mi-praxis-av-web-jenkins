Ext.define('Ext.Praxis.view.eecta.SalesListForm.Filters', {
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
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbfiltro',
                                    fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["1", "Fecha Rpte"],
                                            ["2", "Código Cliente"],
                                            ["3", "Nombre"],
                                            ["4", "Nro Rpte"]
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
                                    height: 26,
                                    value: "3",                                    
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
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha1',
                                            fieldLabel: 'Fecha desde', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 210,
                                            height: 26,
                                            format: 'Ymd',
                                            //formatText: '',
                                            //invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ',                                            
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id+'-fecha2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha2',
                                            fieldLabel: 'Hasta', labelAlign: 'left', labelStyle: 'font-weight: bold;', labelWidth: 38,
                                            width: 128,
                                            height: 26,
                                            format: 'Ymd',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            padding: '2 0 0 10 ',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter02',
                                    border: false,
                                    hidden:true,
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
                                            id: prototype.id + '-CDCLI',
                                            fieldLabel: 'Código Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 210,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value:'',
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
                                    id: prototype.id + '-BoxFilter03',
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
                                            id: prototype.id + '-RSOCI',
                                            fieldLabel: 'Nombre Cliente', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,                                                                                        
                                            width: 300,
                                            height: 26,
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        }                                        
                                    ]
                                },
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter04">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter04',
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
                                            id: prototype.id + '-NRRPT',
                                            fieldLabel: 'Nro rpte venta', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,                                                                                        
                                            width: 300,
                                            height: 26,
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