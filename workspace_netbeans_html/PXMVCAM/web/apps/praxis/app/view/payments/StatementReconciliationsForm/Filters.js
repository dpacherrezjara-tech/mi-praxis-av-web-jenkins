Ext.define('Ext.Praxis.view.payments.StatementReconciliationsForm.Filters', {
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
                    id: prototype.id + '-panelCash',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            title: '<span style="color:#1a4d8f;font-weight:bold;">FILTERS</span>',
                            style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                            bodyStyle: 'background: transparent',
                            layout: {
                                type: 'vbox',
                                align: 'left'
                            },
                            items: [
                                {
                                    // Fila 1: fecha + customer/country/toggle, siempre visible.
                                    // filterDetailCash (Status/Type Source/Doc Sap Bank/Accounts)
                                    // va aparte, debajo, para que arranque alineada a la izquierda.
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    layout: {
                                        type: 'hbox',
                                        align: 'top'
                                    },
                                    items: [
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromYearCash',
                                            fieldLabel: 'From',
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
                                            labelWidth: 35,
                                            width: 95,
                                            labelAlign: 'left',
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromMonthCash',
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
                                            width: 45
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateDayCash',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            disabled: true,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            width: 40,
                                            margin: '0 10 0 0',
                                            listener: {
                                                change: 'onDateFromDaySelect',
                                                expand: 'eventSelectFromDay'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToYearCash',
                                            fieldLabel: 'To',
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
                                            labelWidth: 20,
                                            width: 80
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToMonthCash',
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
                                            width: 45,
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToDayCash',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            disabled: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            width: 40,
                                            anchor: '100%',
                                            listener: {
                                                change: 'onDateToDaySelect',
                                                expand: 'eventSelectToDay'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Customer',
                                            xtype: 'combo',
                                            width: 150,
                                            labelWidth: 55,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            disabled: true,
                                            id: prototype.id + '-typeSocietyCash',
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
                                            value: '',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: '133', name: 'LACSA'},
                                                    {code: '134', name: 'AVIANCA'},
                                                    {code: '202', name: 'TACA'},
                                                    {code: '547', name: 'AEROGAL'},
                                                    {code: '', name: 'All'}
                                                ]
                                            },
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCountryCash',
                                            queryMode: 'local',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            fieldLabel: 'Country',
                                            width: 200,
                                            labelWidth: 50,
                                            typeAhead: true,
                                            valueField: 'A006PAIS',
                                            displayField: 'A006NOMBRE',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            labelAlign: 'left',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            padding: '0 10 0 10',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Dashboard',
                                                    margin: '0 5 0 0',
                                                    width: 60,
                                                    id: prototype.id + '-dashboardCash'
                                                },
                                                {
                                                    xtype: 'component',
                                                    id: prototype.id + '-btnToggleSwitchCashCD',
                                                    margin: '0 5 0 0',
                                                    html: `<style>
                                                .toggle-container{display:inline-block;position:relative;width:30px;height:16px;vertical-align:middle;}
                                                .toggle-input{opacity:0;width:0;height:0;}
                                                .toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}
                                                .toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}
                                                .toggle-input:checked+.toggle-slider{background-color:#4c7daf;}
                                                .toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}
                                            </style>
                                            <label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label>`,
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: 'Detail',
                                                    margin: '0 0 0 5',
                                                    width: 60,
                                                    id: prototype.id + '-detailCash'
                                                },
                                            ]
                                        },
                                        {
                                            fieldLabel: 'Status',
                                            labelAlign: 'left',
                                            width: 180,
                                            labelWidth: 40,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbStatusCash',
                                            hidden: true,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "All"], ["1", "Match"], ["3", "Statement w/o Settlement"], ["5", "Match Manual"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            value: "",
                                            typeAhead: true,
                                            valueField: 'value', displayField: 'description',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            fieldLabel: 'Type Source',
                                            labelAlign: 'left',
                                            width: 200,
                                            labelWidth: 75,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbTypeSourceCash',
                                            hidden: true,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "All"], ["00", "BSP"], ["01", "ICCS"], ["02", "ARC"], ["03", "Venta Directa"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            value: "",
                                            typeAhead: true,
                                            valueField: 'value', displayField: 'description',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            fieldLabel: 'Doc Sap Bank',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtBANDOCASH',
                                            hidden: true,
                                            width: 170,
                                            labelWidth: 84,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
                                            maxLength: 10,
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z0-9]/,
                                            listeners: {
                                                keypress: 'eventKey_BANDOCASH'
                                            }
                                        }
                                    ]
                                }
                                    ]
                                },
                                {
                                    // Fila 2: solo Accounts -- se oculta/muestra por su propio ID
                                    // (no como bloque), pero visualmente necesita su propia fila
                                    // porque no entra en la fila 1 junto a los demás filtros.
                                    xtype: 'panel',
                                    id: prototype.id + '-filterDetailCash',
                                    margin: '15 0 0 0',
                                    bodyStyle: 'background: transparent',
                                    border: false,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Accounts',
                                            width: 260,
                                            labelWidth: 60,
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            id: prototype.id + '-typeSocietyCas22h',
                                            hidden: true,
                                            queryMode: 'local',
                                            editable: false,
                                            multiSelect: true,
                                            forceSelection: false,
                                            triggerAction: 'all',
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'Select Accounts',
                                            listConfig: {
                                                maxHeight: 200,
                                                cls: 'excel-filter-list'
                                            },
                                            store: Ext.create('Ext.data.Store', {
                                                fields: ['code', 'name', 'checked'],
                                                data: []
                                            }),
                                            tpl: new Ext.XTemplate(
                                                    '<ul class="x-list-plain">',
                                                    '<tpl for=".">',
                                                    '<li class="x-boundlist-item" style="cursor: pointer; padding: 5px;">',
                                                    '<input type="checkbox" class="customer-checkbox" data-code="{code}" {[values.checked ? "checked=\\"checked\\"" : ""]} /> ',
                                                    '{name}',
                                                    '</li>',
                                                    '</tpl>',
                                                    '</ul>'
                                                    ),
                                            listeners: {
                                                select: 'onCustomerSelect'
                                            }
                                        },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelCredit',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            layout: {
                                type: 'hbox',
                                align: 'top'
                            },
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">FILTER DATE</span>',
                                    width: 380,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateFromYear',
                                            fieldLabel: 'From',
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
                                            labelWidth: 35,
                                            width: 95,
                                            labelAlign: 'left',
                                        },
                                        {
                                            xtype: 'combo',
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
                                            width: 45
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateDay',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            disabled: true,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            width: 40,
                                            margin: '0 10 0 0',
                                            listener: {
                                                change: 'onDateFromDaySelect',
                                                expand: 'eventSelectFromDay'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToYear',
                                            fieldLabel: 'To',
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
                                            labelWidth: 20,
                                            width: 80
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToMonth',
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
                                            width: 45,
                                            anchor: '100%'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateToDay',
                                            labelAlign: 'right',
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            editable: false,
                                            autoSelect: false,
                                            enableKeyEvents: true,
                                            caseSensitive: true,
                                            disabled: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            emptyText: 'All',
                                            width: 40,
                                            anchor: '100%',
                                            listener: {
                                                change: 'onDateToDaySelect',
                                                expand: 'eventSelectToDay'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">FILTER COMBO</span>',
                                    width: 1200,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Search By',
                                            width: 160,
                                            labelWidth: 60,
                                            labelAlign: 'left',
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbDateSel',
                                            triggerAction: 'all',
                                            enableKeyEvents: true,
                                            readOnly: false,
                                            disabled: true,
                                            editable: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            fieldStyle: 'text-align: left;',
                                            hidden: false,
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbCountry',
                                            queryMode: 'local',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            fieldLabel: 'Country',
                                            width: 200,
                                            labelWidth: 50,
                                            typeAhead: true,
                                            valueField: 'A006PAIS',
                                            displayField: 'A006NOMBRE',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            labelAlign: 'left',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Processor',
                                            labelAlign: 'left',
                                            id: prototype.id + '-cmbCOREP',
                                            queryMode: 'local',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            width: 200,
                                            labelWidth: 60,
                                            typeAhead: true,
                                            valueField: 'VALUE',
                                            displayField: 'NAME',
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            fieldLabel: 'Status',
                                            labelAlign: 'left',
                                            width: 180,
                                            labelWidth: 40,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbStatus',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "All"], ["1", "Match"], ["3", "Statement w/o Settlement"], ["5", "Match Manual"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            value: "",
                                            hidden: false,
                                            typeAhead: true,
                                            valueField: 'value', displayField: 'description',
                                            enableKeyEvents: true,
                                            triggerAction: 'all',
                                            margin: '0 10 0 0'
                                        },
                                        {
                                            fieldLabel: 'Doc. Type',
                                            labelWidth: 60,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbTDOC',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            triggerAction: 'all',
                                            enableKeyEvents: true,
                                            readOnly: false,
                                            editable: true,
                                            valueField: 'value',
                                            displayField: 'description',
                                            width: 130,
                                            hidden: false,
                                            value: '',
                                            labelAlign: 'left',
                                            margin: '0 10 0 0',
                                            store: {
                                                fields: ['value', 'description'],
                                                data: [
                                                    {value: '', description: 'All'},
                                                    {value: 'S', description: 'Sales'},
                                                    {value: 'D', description: 'Debits'}
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Code Bank',
                                            id: prototype.id + '-cmbBank',
                                            queryMode: 'local',
                                            labelStyle: 'text-align: left; font-size: 12px;',
                                            fieldStyle: 'text-align: center; font-size: 12px;',
                                            valueField: 'CODEBANK',
                                            displayField: 'IN_CODE_IN_NAME',
                                            emptyText: 'All',
                                            labelAlign: 'left',
                                            width: 245,
                                            labelWidth: 66,
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            layout: {
                                type: 'hbox',
                                align: 'top'
                            },
                            border: false,
                            items: [
                                {
                                    xtype: 'fieldset',
                                    title: '<span style="color:#1a4d8f;font-weight:bold;">MORE OPTIONS</span>',
                                    width: 700,
                                    style: 'border: 1px solid #1a4d8f; padding: 8px; margin: 5px;',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            fieldLabel: 'Doc Sap Bank',
                                            labelAlign: 'left',
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtBANDOC',
                                            width: 170,
                                            labelWidth: 84,
                                            enableKeyEvents: true,
                                            margin: '0 10 0 0',
                                            maxLength: 10,
                                            enforceMaxLength: true,
                                            maskRe: /[a-zA-Z0-9]/,
                                            listeners: {
                                                keypress: 'eventKey_BANDOC'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Currency ',
                                            id: prototype.id + '-cmbCode',
                                            queryMode: 'local',
                                            triggerAction: 'all',
//                                            disabled: true,
                                            valueField: 'A005KEY',
                                            displayField: 'A005KEY2',
                                            emptyText: 'All',
//                                            maxLength: 3,
                                            labelWidth: 55,
                                            width: 180,
                                            hiddenLabel: false,
                                            margin: '0 10 0 0',
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Colombia',
                                            margin: '3 0 0 3',
                                            id: prototype.id + '-COL',
                                            width: 60
                                        },
                                        {
                                            xtype: 'component',
                                            id: prototype.id + '-btnToggleSwitchFT',
                                            margin: '3 0 0 3',
                                            html: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">\n\
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
                                            <title>Modo Alternancia</title>\n\
                                            <style>.toggle-container{display:inline-block;position:relative;width:30px;height:16px;}.toggle-input{opacity:0;width:0;height:0;}.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#72e34f;transition:.4s;border-radius:16px;}.toggle-slider::before{position:absolute;content:"";height:12px;width:12px;border-radius:50%;left:2px;bottom:2px;background-color:white;transition:.4s;}.toggle-input:checked+.toggle-slider{background-color:#4c7daf;}.toggle-input:checked+.toggle-slider::before{transform:translateX(16px);}</style></head><body>\n\
                                            <label class="toggle-container"><input type="checkbox" class="toggle-input"><span class="toggle-slider"></span></label></body></html>',
                                            tooltip: 'Export to Report',
                                            listeners: {
                                                change: 'chgBash',
                                                click: 'clickToggleSwitch'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Exterior',
                                            margin: '3 10 0 13',
                                            id: prototype.id + '-EXT',
                                            width: 60
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Pending Buss',
                                            id: prototype.id + '-labelpendingBuss',
                                            align: 'left',
                                            style: 'text-align: left;',
                                            hidden: false,
                                            margin: '3 10 0 0'
                                        },
                                        {
                                            xtype: 'checkbox',
                                            id: prototype.id + '-pendingBuss',
                                            inputValue: 'Refund',
                                            name: 'chkPendingBuss',
                                            boxLabelAlign: 'before',
                                            listeners: {
                                                change: 'pendingBuss_changeHandler'
                                            }
                                        },
                                        {
                                            fieldLabel: 'Business',
                                            hidden: true,
                                            labelAlign: 'left',
                                            width: 150,
                                            labelWidth: 50,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbNEGOC',
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
                                            value: '',
                                            store: {
                                                fields: ['code', 'name'],
                                                data: [
                                                    {code: '', name: 'All'},
                                                    {code: 'B', name: 'Pending'},
                                                    {code: '1', name: 'Pasajes'},
                                                    {code: '2', name: 'Cargo'},
                                                    {code: '3', name: 'Correo'}
//                            {code: 'S', name: 'Standby'}
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Account',
                                            id: prototype.id + '-cmbEFTE',
                                            queryMode: 'local',
                                            hidden: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            margin: '0 0 0 20',
                                            fieldStyle: 'text-align: left;',
                                            labelWidth: 60,
                                            width: 276,
                                            labelAlign: 'left'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Transaction',
                                            id: prototype.id + '-cmbTTRAN',
                                            fieldStyle: 'text-align: left;',
                                            queryMode: 'local',
                                            hidden: true,
                                            valueField: 'code',
                                            displayField: 'name',
                                            margin: '0 0 0 30',
                                            labelWidth: 100,
                                            width: 251,
                                            labelAlign: 'left'
                                        },
                                        {
                                            xtype: 'form',
                                            border: false,
                                            id: prototype.id + '-filterMain_3',
                                            bodyStyle: 'background: transparent',
                                            margin: '5px 0 0 15px',
                                            layout: 'column',
                                            defaults: {
                                                fieldStyle: 'text-align: center;',
                                                anchor: '100%',
                                                hiddenLabel: false,
                                                labelAlign: 'right',
                                                xtype: 'textfield',
                                                hidden: false,
                                                selectOnFocus: true
                                            },
                                            items: [
                                                {xtype: 'tbspacer', width: 20},
                                                {
                                                    xtype: 'radiogroup',
                                                    hidden: true,
                                                    id: prototype.id + '-rbgType',
                                                    items: [
                                                        {boxLabel: '<strong style="color:#148D28" >Doc Sap   </strong>', name: 'rb', inputValue: 'rbDOCS', width: 80, checked: true},
                                                        {boxLabel: '<strong style="color:#148D28" >Taca Flown </strong>', name: 'rb', inputValue: 'rbTACA', width: 90}
                                                    ],
                                                    listeners: {
                                                        change: 'searchTRANSA_clickHandler'
                                                    }
                                                },
                                            ]
                                        },
                                        
                                        {
                                            fieldLabel: 'Source',
                                            labelAlign: 'left',
                                            width: 180,
                                            labelWidth: 40,
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbSource',
                                            store: new Ext.data.SimpleStore({
                                                fields: ['value', 'description'],
                                                data: [
                                                    ["", "All"], ["B", "BSP"], ["I", "ICCS"], ["A", "ARC"], ["S", "SALES DIRECT"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            allowBlank: false,
                                            forceSelection: true,
                                            selectOnFocus: true,
                                            caseSensitive: false,
                                            autoSelect: true,
                                            editable: true,
                                            value: "",
                                            hidden: true,
                                            typeAhead: true,
                                            valueField: 'value', displayField: 'description',
                                            enableKeyEvents: true,
                                            triggerAction: 'all'
                                        },
                                        {
                                            xtype: 'label',
                                            text: ' ',
                                            margin: '13 0 0 10',
                                            id: prototype.id + '-TEST',
                                            hidden: true,
                                            width: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Merchant Number:',
                                            id: prototype.id + '-txtLiquida',
                                            allowBlank: true,
                                            maskRe: /[0-9]/,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            hidden: true,
                                            labelWidth: 150,
                                            width: 300,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: 'eventKey'
                                            }
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-rbgTypeCASH',
                                            minHeight: 32,
                                            hidden: true,
                                            width: '100%', // 
                                            items: [
                                                {boxLabel: '<b style="color:#148D28;">Normal</b>', inputValue: 'Normal', name: 'rbgTypeCASH', checked: true},
                                                {xtype: 'tbspacer', width: 20},
                                                {boxLabel: '<b style="color:#148D28;">Detalle</b>', inputValue: 'Detalle', name: 'rbgTypeCASH'}
                                            ],
                                            listeners: {
                                                change: 'cmbTranType_changeHandler'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                }
            ]
        }
    ]
});

Ext.util.CSS.createStyleSheet(`
    /* Contenedor del listado */
    .excel-filter-list .x-boundlist-item {
        padding: 6px 10px;
        cursor: pointer;
        font-size: 12px;
        display: flex;
        align-items: center;
    }

    /* Hover estilo Excel */
    .excel-filter-list .x-boundlist-item:hover {
        background-color: #EAF2FF;
    }

    /* Checkbox */
    .excel-filter-list input[type=checkbox] {
        margin-right: 8px;
        cursor: pointer;
    }

    /* Item seleccionado */
    .excel-filter-list .x-boundlist-selected {
        background-color: #D6E6FF !important;
    }

    /* Texto */
    .excel-filter-list .x-boundlist-item span {
        white-space: nowrap;
    }
`, 'excel-filter-style');
