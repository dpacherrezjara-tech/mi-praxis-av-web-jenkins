Ext.define('Ext.Praxis.view.interline.ValidationInterfacesForm.Filters', {
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
            margin: '10px 0 10px 15px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right'
            },
            items: [
                
                {
                    fieldLabel: 'Avianca Group',
                    hidden: false,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 200,
                    labelWidth: 100,
                    xtype: 'combo', 
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
                            {code: '547', name: 'AEROGAL'}
                        ]
                    },
                    listeners: {
                        change: 'btnSearch_click'
                    }
                },
//                {xtype: 'tbspacer', width: 15, height:20},
//                {
//                    xtype: 'textfield',
//                    fieldLabel: 'Extraction Date',
//                    id: prototype.id + '-extractionDate',
//                    editable: true,
//                    readOnly: false,
//                    enforceMaxLength: true,
//                    maxLength: 8,
//                    maskRe: /[0-9/]/,
//                    labelWidth: 100,
//                    labelStyle: 'text-align: left; font-size: 14px;',
//                    fieldStyle: 'text-align: left; font-size: 14px;',
//                    width: 190
//                },
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    fieldLabel: 'Extraction Date',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable:false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 105,
                    width: 170,
                    anchor: '100%'                    
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable:false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 0,
                    width: 55,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id+'-cmbDateFromDay',
                    fieldStyle: 'text-align: left;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code', displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 0,
                    width: 50,
                    anchor: '100%',
                    listConfig: {maxHeight: 111, minWidth: 60}
                },
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Interface',
                    id: prototype.id + '-interface',
                    editable: true,
                    readOnly: false,
                    enforceMaxLength: true,
                    maxLength: 20,
                    labelWidth: 70,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 230
                },
                {xtype: 'tbspacer', width: 15, height:20},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Referencia',
                    id: prototype.id + '-referencia',
                    editable: true,
                    readOnly: false,
                    enforceMaxLength: true,
                    maxLength: 40,
                    labelWidth: 70,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    width: 230
                }
            ]
        }
    ]
});
