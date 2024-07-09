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
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: false,
//                            margin: '1',
                            height: 550,
                            width: 1000,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },

                            items: [
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
//                                          hidden:true,
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
//                                          value: "ADATE",
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
//                            labelWidth: 60,
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
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCores',
                                            margin: '10 0 0 10',
                                            style: 'font-weight:bold;color:#0B333C;',
                                            fieldStyle: 'text-align:left;',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            valueField: 'CODE',
                                            displayField: 'NAME',
                                            width: 200,
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnTxtLIQUI',
                                            icon: 'resources/img/botones/txt.png',
                                            tooltip: 'Export to Txt Liquidacion',
                                            padding: '3 0',
                                        },
                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnTxtSALE',
                                            icon: 'resources/img/botones/txt.png',
                                            tooltip: 'Export to Txt Sale',
                                            padding: '3 0',
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
//                                    defaults: {
//                                        border: true,
//                                        padding: '0px 5px 0px 5px'
//                                    },
//                                    padding: '1px 5px 1px 5px',
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
                                                xtype: 'label',
//                                                margin: '3px 0px 0px 5px'
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


