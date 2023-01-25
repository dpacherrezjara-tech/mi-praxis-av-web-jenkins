Ext.define('Ext.Praxis.view.flown.ForecastForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Flight Date</strong>',
                    align: 'left',
                    fieldStyle: 'text-align: left;',
                    padding: '8px 30px 0px 5px',
                    hidden: false
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
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
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
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
                    width: 70,
                    anchor: '100%'
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
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
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
                    width: 70,
                    anchor: '100%'
                },
                /*{
                 xtype: 'combo',
                 id: prototype.id + '-cmbTReg',
                 fieldStyle: 'text-align: left;',
                 fieldLabel: 'Type Register',
                 labelAlign: 'right',
                 queryMode: 'local',
                 editable: true,
                 triggerAction: 'all',
                 autoSelect: false,
                 enableKeyEvents: true,
                 caseSensitive: true,
                 hidden: false,
                 valueField: 'code',
                 displayField: 'name',
                 emptyText: 'All',
                 labelWidth: 100,
                 width: 230,
                 },*/
                {xtype: 'tbspacer', width: 30},
                {
                    xtype: 'radiogroup',
                    id: prototype.id + '-radiogroupType',
                    width: 640,
                    items: [
                        {boxLabel: '<b style="color:#148D28;">Flown Real</b>', inputValue: 'F', name: 'rbgType', checked: true},
                        {boxLabel: '<b style="color:#148D28;">Seats</b>', inputValue: 'I', name: 'rbgType'},
                        {boxLabel: '<b style="color:#148D28;">Display Forecast</b>', inputValue: 'FC', name: 'rbgType'},
                        //{xtype: 'tbspacer', width: 5},
                        {boxLabel: '<b style="color:#148D28;">Revenue by Regions</b>', inputValue: 'AZ', name: 'rbgType'},
                        {boxLabel: '<b style="color:#148D28;">Revenue by Years</b>', inputValue: 'YY', name: 'rbgType'},
                        /*{boxLabel: '<b style="color:#148D28;">Forecast Percentage</b>', inputValue: 'FP', name: 'rbgType'},
                         {boxLabel: '<b style="color:#148D28;">Forecast Zones</b>', inputValue: 'FZ', name: 'rbgType'}*/
                    ],
                    listeners: {
                        change: 'rbChangeType'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbBank',
                    fieldStyle: 'text-align: left;',
                    fieldLabel: 'Code Bank',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: true,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: true,
                    valueField: 'CODEBANK',
                    displayField: 'IN_CODE_IN_NAME',
                    emptyText: 'All',
                    labelWidth: 90,
                    width: 260
                },
                {xtype: 'tbspacer', width: 250},
            ]
        },
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                /*{
                 xtype: 'textfield',
                 fieldLabel: 'Merchant Number:',
                 id: prototype.id + '-txtMerchant2',
                 allowBlank: true,
                 //                    maskRe: /[0-9]/,
                 enforceMaxLength: true,
                 maxLength: 20,
                 labelWidth: 150,
                 width: 300,
                 enableKeyEvents: true,
                 listeners: {
                 keypress: 'eventKey'
                 }
                 },*/
                {xtype: 'tbspacer', width: 140},
                {
                    xtype: 'radiogroup',
                    id: prototype.id + '-radiogroupForecast',
                    fieldLabel: '',
                    height: 42,
                    columns: 2,
                    vertical: true,
                    hidden: true,
                    items: [
                        {boxLabel: '<b style="color:#148D28;">Forecast</b>', inputValue: 'FC', name: 'rbgTypeForecast', checked: true},
                        {boxLabel: '<b style="color:#148D28;">Occupation factor</b>', inputValue: 'FP', name: 'rbgTypeForecast', width: 150},
                        {boxLabel: '<b style="color:#148D28;">Forecast Zones</b>', inputValue: 'FZ', name: 'rbgTypeForecast', width: 150},
                        {boxLabel: '<b style="color:#148D28;">Forecast Coupon Detail</b>', inputValue: 'FD', name: 'rbgTypeForecast', width: 200},
                    ],
                    listeners: {
                        change: 'onChangeRadioForecast'
                    }
                },
            ]
        },
        {
            xtype: 'checkboxfield',
            id: prototype.id + '-chkMarketByLevel',
            width: 130,
            hidden: true,
            margin: '0px 0px 0px 0px',
            boxLabel: 'Market by level',
            inputValue: '1',
            listeners: {
                change: 'btnSearch_MarketByLevel'
            }
        },
        {
            xtype: 'combo',
            id: prototype.id + '-cmbSummaryType',
            store: new Ext.data.SimpleStore({
                fields: ['code', 'name'],
                data: [
                    ["G", "General"], ["D", "Domestic"], ["I", "International"]
                ]
            }),
            hidden: true,
            fieldStyle: 'text-align: left;',
            disabled: false,
            editable: false,
            margin: '-6px 0px 0px 0px',
            fieldLabel: 'Type',
            width: 150,
            labelWidth: 45,
            value: "G",
            labelAlign: 'right',
            queryMode: 'local',
            triggerAction: 'all',
            valueField: 'code', displayField: 'name',
            listConfig: {maxHeight: 111, minWidth: 70},
            listeners: {
                change: 'cbxSummaryType_changeHandler'
            }
        },
        /*{
         xtype: 'form',
         border: false,
         bodyStyle: 'background: transparent',
         padding: '2px 5px 1px 5px',
         layout: 'column',
         defaults: {
         //                labelStyle: 'font-weight:bold;',
         fieldStyle: 'text-align: center;',
         padding: '5px 1px 5px 1px',
         anchor: '100%',
         hiddenLabel: false,
         labelAlign: 'right',
         hidden: false
         },
         items: [
         {
         xtype: 'panel',
         width: 150,
         height: 50,
         border: false,
         margin: '5 0 5 0',
         layout: {
         type: 'vsbox',
         pack: 'center'
         },
         bodyStyle: 'background-color: transparent;',
         items: [
         {
         xtype: 'radiogroup',
         id: prototype.id + '-radiogroupForecast',
         fieldLabel: '',
         height: 50,
         columns: 1,
         vertical: true,
         items: [
         {boxLabel: '<b style="color:#148D28;">Forecast Percentage</b>', inputValue: 'FP', name: 'rbgTypeForecast', width: 150},
         {boxLabel: '<b style="color:#148D28;">Forecast Zones</b>', inputValue: 'FZ', name: 'rbgTypeForecast', width: 150},
         ],
         listeners: {
         change: 'onChangeRadioForecast'
         }
         }
         ]
         },
         ]}*/

    ]
});
