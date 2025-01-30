Ext.define('Ext.Praxis.view.payments.OutputsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1400,
                height: 700,
                align: 'center'
            },

            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    border: false,
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: false,
                            height: 550,
                            width: 1200,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '10 2 2 20',
                                    defaults: {
                                        anchor: '100%',
                                        width: 1080
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 7},
                                        {
                                            xtype: 'label',
                                            text: 'Download File',
                                            style: 'font-weight:bold;color:#0B333C;text-decoration: underline;',
                                            width: 130,
                                            height: 25
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    border: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    defaults: {
                                        margin: '10 0 10 0'
                                    },
                                    items: [
                                        {xtype: 'tbspacer', width: 50},
                                        {
                                            xtype: 'label',
                                            text: 'Search By:',
                                            padding: '3 0',
                                            width: 60
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbFecFiltro',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 120,
                                            typeAhead: true,
                                            hidden: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            listConfig: {minWidth: 130},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            listeners: {
                                            }
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'combo',
                                            margin: '10 0 0 10',
                                            id: prototype.id + '-cmbDateFromYear',
                                            fieldLabel: '',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            editable: false,
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            width: 70,
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'combo',
                                            margin: '10 0 0 10',
                                            id: prototype.id + '-cmbDateFromMonth',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            hidden: false,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            width: 70,
                                            anchor: '100%'
                                        },
                                        {xtype: 'tbspacer', width: 20},
                                        {
                                            xtype: 'label',
                                            text: 'Client:',
                                            padding: '3 0',
                                            width: 40
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbClient',
                                            margin: '10 0 0 10',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            width: 90
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            text: 'Colombia',
                                            margin: '13 0 0 10',
                                            id: prototype.id + '-COL',
                                            width: 60
                                        },
                                        {
                                            xtype: 'component',
                                            id: prototype.id + '-btnToggleSwitch',
                                            margin: '13 0 0 10',
                                            html: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Modo Alternancia</title><style>.toggle-container{display:inline-block;position:relative;width:30px;height:16px;}.toggle-input{opacity:0;width:0;height:0;}.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;transition:.4s;border-radius:16px;}.toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}.toggle-input:checked+.toggle-slider{background-color:#4c7daf;}.toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}</style></head><body><label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label></body></html>',
                                            tooltip: 'Export to Report',
                                            listeners: {
                                                change: 'chgBash',
                                                click: 'clickToggleSwitch'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Exterior',
                                            margin: '13 0 0 10',
                                            id: prototype.id + '-EXT',
                                            width: 60
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Procesador:',
                                            margin: '13 0 0 10',
                                            hidden:true,
                                            id: prototype.id + '-PRO',
                                            width: 70
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCores',
                                            margin: '10 0 0 10',
                                            hidden:true,
                                            editable: false,
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            width: 200
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            text: 'Settlement:',
                                            padding: '3 0',
                                            width: 70
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnTxtLIQUI',
                                            icon: 'resources/img/botones/txt.png',
                                            tooltip: 'Export to Txt Liquidacion',
                                            padding: '3 0'
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            text: 'Sales:',
                                            padding: '3 0',
                                            width: 40
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnTxtSALE',
                                            icon: 'resources/img/botones/txt.png',
                                            tooltip: 'Export to Txt Sale',
                                            padding: '3 0'
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btn-bill',
                                            padding: '3 0',
                                            width: 80,
                                            html: '<strong style="color:black;">Bill</strong>',
                                            style: 'background:#70E3EC;color:white;font-weight:bold;',
                                            border: true,
                                            listeners: {
                                                click: 'onBill'
                                            }
                                        },
                                    ]
                                },
                                {xtype: 'tbspacer', width: 7, height: 10},
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    hidden: true,
                                    border: true,
                                    width: 998,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 998,
                                            height: 25,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label'
                                            },
                                            items: [
                                                {
                                                    text: 'Page',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-currentPage',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },

                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


