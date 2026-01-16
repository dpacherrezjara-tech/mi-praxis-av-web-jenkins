Ext.define('Ext.Praxis.view.payments.TemplateReconciliaCreditForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '0px 0 8px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelModeWork',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'start'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: {
                                type: 'hbox',
                                align: 'start'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">GLOBAL FILTERS</span>',
                                    width: 380,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Customer',
                                            xtype: 'combo',
                                            width: 150,
                                            labelWidth: 55,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            disabled: false,
                                            id: prototype.id + '-typeClient',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            listConfig: {maxHeight: 130},
                                            typeAhead: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            value: '134',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: '133', name: 'LACSA'},
                                                    {code: '134', name: 'AVIANCA'},
                                                    {code: '202', name: 'TACA'},
                                                    {code: '547', name: 'AEROGAL'},
//                                    {code: '', name: 'ALL'}
                                                ]
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Processor',
                                            id: prototype.id + '-cmbProcessor',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 195,
                                            labelWidth: 55,
                                            typeAhead: true,
                                            valueField: 'A4451KEY2',
                                            displayField: 'A4451KEY3',
                                            listConfig: {minWidth: 130},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0',
                                            listeners: {
                                                change: 'changeViewProcessor'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            hidden: true,
                                            id: prototype.id + '-cmbCountry',
                                            fieldLabel: 'Country',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 219,
                                            labelWidth: 50,
                                            typeAhead: true,
                                            valueField: 'A006PAIS',
                                            displayField: 'A006NOMBRE',
                                            listConfig: {maxHeight: 200},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">STATEMENT FILTERS</span>',
                                    width: 340,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            bodyStyle: 'background: transparent',
                                            format: 'Y/m/d',
                                            value: new Date(),
                                            id: prototype.id + '-txtFromBandoc',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: left; font-size: 12px;',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 125,
                                            fieldLabel: 'From',
                                            labelAlign: 'left',
                                            labelWidth: 30,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Bandoc',
                                            id: prototype.id + '-txtBandoc',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9a-zA-Z]/,
                                            maxLength: 10,
                                            width: 150,
                                            labelWidth: 50,
                                            enableKeyEvents: true,
                                            margin: '0 10px 0 0',
                                            listeners: {keypress: 'searchBandocWMH'}
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearchBandoc',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-saleFilters',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">SALE FILTERS</span>',
                                    width: 380,
                                    hidden: true,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            bodyStyle: 'background: transparent',
                                            format: 'Y/m/d',
                                            value: new Date(),
                                            id: prototype.id + '-txtFromSale',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: left; font-size: 12px;',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 125,
                                            fieldLabel: 'From',
                                            labelAlign: 'left',
                                            labelWidth: 30,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'datefield',
                                            bodyStyle: 'background: transparent',
                                            format: 'Y/m/d',
                                            value: new Date(),
                                            id: prototype.id + '-txtToSale',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: left; font-size: 12px;',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 110,
                                            fieldLabel: 'To',
                                            labelAlign: 'left',
                                            labelWidth: 15,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-chkMarkSales',
                                            cls: 'segcheck',
                                            fieldLabel: '<span>Mark All</span>',
                                            labelAlign: 'left',
                                            labelWidth: 50,
                                            checked: false,
                                            listeners: {change: 'markAllGridSale'},
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearchSale',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-headerFilters',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">HEADER FILTERS</span>',
                                    width: 300,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            bodyStyle: 'background: transparent',
                                            format: 'Y/m/d',
                                            value: new Date(),
                                            id: prototype.id + '-txtFromHeader',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: left; font-size: 12px;',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 125,
                                            fieldLabel: 'From',
                                            labelAlign: 'left',
                                            labelWidth: 30,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'datefield',
                                            bodyStyle: 'background: transparent',
                                            format: 'Y/m/d',
                                            value: new Date(),
                                            id: prototype.id + '-txtToHeader',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: left; font-size: 12px;',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 110,
                                            fieldLabel: 'To',
                                            labelAlign: 'left',
                                            labelWidth: 15,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearchHeader',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-setlementFilters',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">SETTLEMENT FILTERS</span>',
                                    width: 650,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            bodyStyle: 'background: transparent',
                                            format: 'Y/m/d',
                                            value: new Date(),
                                            id: prototype.id + '-txtFromSett',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: left; font-size: 12px;',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 130,
                                            fieldLabel: 'From',
                                            labelAlign: 'left',
                                            labelWidth: 35,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'datefield',
                                            bodyStyle: 'background: transparent',
                                            format: 'Y/m/d',
                                            value: new Date(),
                                            id: prototype.id + '-txtToSett',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: left; font-size: 12px;',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 120,
                                            fieldLabel: 'To',
                                            labelAlign: 'left',
                                            labelWidth: 20,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Merchand',
                                            id: prototype.id + '-txtMerchand',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9a-zA-Z]/,
                                            maxLength: 15,
                                            width: 150,
                                            labelWidth: 60,
                                            enableKeyEvents: true,
                                            margin: '0 10px 0 0',
                                            listeners: {keypress: 'searchBandocWMH'}
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Liquidacio',
                                            id: prototype.id + '-txtLiquidacio',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9a-zA-Z]/,
                                            maxLength: 50,
                                            width: 150,
                                            labelWidth: 60,
                                            enableKeyEvents: true,
                                            margin: '0 10px 0 0',
                                            listeners: {keypress: 'searchBandocWMH'}
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearchSettlement',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search'
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            border: false,
                            layout: {
                                type: 'hbox',
                                align: 'start'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    id: prototype.id + '-discountFilters',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">DISCOUNT FILTERS</span>',
                                    width: 730,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            bodyStyle: 'background: transparent',
                                            format: 'Y/m/d',
                                            value: new Date(),
                                            id: prototype.id + '-txtFromDisc',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: left; font-size: 12px;',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 125,
                                            fieldLabel: 'From',
                                            labelAlign: 'left',
                                            labelWidth: 30,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'datefield',
                                            bodyStyle: 'background: transparent',
                                            format: 'Y/m/d',
                                            value: new Date(),
                                            id: prototype.id + '-txtToDisc',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: left; font-size: 12px;',
                                            maskRe: /[0-9/]/,
                                            enforceMaxLength: true,
                                            width: 110,
                                            fieldLabel: 'To',
                                            labelAlign: 'left',
                                            labelWidth: 15,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Merchand',
                                            id: prototype.id + '-txtMerchandDiscount',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9a-zA-Z]/,
                                            maxLength: 15,
                                            width: 150,
                                            labelWidth: 60,
                                            enableKeyEvents: true,
                                            margin: '0 10px 0 0',
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Liquidacio',
                                            id: prototype.id + '-txtLiquidacioDiscount',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9a-zA-Z]/,
                                            maxLength: 50,
                                            width: 150,
                                            labelWidth: 60,
                                            enableKeyEvents: true,
                                            margin: '0 10px 0 0',
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-chkMarkhELP',
                                            cls: 'segcheck',
                                            fieldLabel: '<span>Help</span>',
                                            labelAlign: 'left',
                                            labelWidth: 30,
                                            checked: true,
                                            margin: '0 10px 0 0'
                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-btnSearchDiscount',
                                            iconCls: 'prx-icon-search',
                                            tooltip: 'Search'
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelModeReview',
                    bodyStyle: 'background: transparent',
                    border: false,
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'start'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title: '<span style="color:#1a4d8f;font-weight:bold;">GLOBAL FILTERS</span>',
                            width: 430,
                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    fieldLabel: 'Customer',
                                    xtype: 'combo',
                                    width: 150,
                                    labelWidth: 55,
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    disabled: false,
                                    id: prototype.id + '-typeClientReview',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    listConfig: {maxHeight: 130},
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: '134',
                                    store: {
                                        fields: ['code', 'name'],
                                        data: [
                                            {code: '133', name: 'LACSA'},
                                            {code: '134', name: 'AVIANCA'},
                                            {code: '202', name: 'TACA'},
                                            {code: '547', name: 'AEROGAL'},
//                                    {code: '', name: 'ALL'}
                                        ]
                                    },
                                    margin: '0 10 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Processor',
                                    id: prototype.id + '-cmbProcessorReview',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    queryMode: 'local',
                                    allowBlank: false,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 250,
                                    labelWidth: 55,
                                    typeAhead: true,
                                    valueField: 'A4451KEY2',
                                    displayField: 'A4451KEY3',
                                    listConfig: {minWidth: 130},
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    margin: '0 10 0 0',
                                    listeners: {
                                        change: 'changeViewProcessorReview'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: '<span style="color:#1a4d8f;font-weight:bold;">STATEMENT FILTERS</span>',
                            width: 200,
                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Bandoc',
                                    id: prototype.id + '-txtBandocReview',
                                    labelStyle: 'text-align: left; font-size: 12px;',
                                    fieldStyle: 'text-align: center; font-size: 12px;',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9a-zA-Z]/,
                                    maxLength: 10,
                                    width: 150,
                                    labelWidth: 50,
                                    enableKeyEvents: true,
                                    margin: '0 10px 0 0',
                                    listeners: {keypress: 'searchBandocReview'}
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});


Ext.util.CSS.createStyleSheet(`
    /* Secondary action */
    .btn-process-secondary {
        background-color: #f5f7fa !important;
        border: 1px solid #c9d4e2 !important;
        border-radius: 5px !important;
        color: #24678D !important;
        font-weight: bold !important;
        font-size: 10px !important;
        padding: 0px 14px !important;
        height: 22px !important;
        line-height: 24px !important;
        transition: all .2s ease-in-out;
    }

    .btn-process-secondary.x-btn-over {
        background-color: #e8eef7 !important;
    }

    .btn-process-secondary.x-btn-pressed {
        background-color: #24678D !important;
        border-color: #24678D !important;
        color: white !important;
    }

    .btn-process-primary .x-btn-inner,
    .btn-process-secondary .x-btn-inner {
        color: inherit !important;
    }
`, 'btn-process-actions-style');
