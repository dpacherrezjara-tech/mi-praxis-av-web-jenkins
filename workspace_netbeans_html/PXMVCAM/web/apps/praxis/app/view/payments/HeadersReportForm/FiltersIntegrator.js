Ext.define('Ext.Praxis.view.payments.HeadersReportForm.FiltersIntegrator', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersIntegrator',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    requires: [
        'Ext.Praxis.view.widgets.MonthField2',
        'Ext.Praxis.view.widgets.CalendarTmz'
    ],
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFiltersIntegrator',
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 10',
                    layout: 'vbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background: transparent',
                            defaults: {
                                fieldStyle: 'text-align: center;',
                                padding: '5 1 5 1',
                                anchor: '100%',
                                hiddenLabel: false,
                                labelAlign: 'right',
                                hidden: false
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    labelWidth: 50,
                                    width: 140,
                                    name: 'IN_DATEF',
                                    //                                    value: new Date(anioActual, mesActual, 1),
                                    //                                    listeners: {
                                    //                                        change: 'onChangeDateSTBtn'
                                    //                                    },
                                    id: prototype.id + '-datefieldFromST',
                                    value: new Date()
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    labelWidth: 30,
                                    width: 120,
                                    name: 'IN_DATET',
                                    //                                    value: new Date(anioActual, mesActual, 1),
                                    //                                    listeners: {
                                    //                                        change: 'onChangeDateSTBtn'
                                    //                                    },
                                    id: prototype.id + '-datefieldToST',
                                    value: new Date()
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'File Name',
                                    labelWidth: 90,
                                    width: 280,
                                    name: 'IN_FILENAME',
                                    maxLength: 200,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'File Type',
                                    name: 'IN_FILETYPE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['ReportSAP', 'Report SAP'],
                                            ['REJECTED', 'Rejected'],
                                            ['SUCCESS', 'Success']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STATUS',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['1', 'Found'],
                                            ['0', 'Not Found']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'File Ref',
                                    labelWidth: 90,
                                    width: 280,
                                    name: 'IN_FILEREF',
                                    maxLength: 200,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Header Text',
                                    labelWidth: 100,
                                    width: 280,
                                    name: 'IN_HEADER',
                                    maxLength: 20,
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                            ]
                        }
                    ]
                }
                //</editor-fold>

            ]
        }
    ]
});
