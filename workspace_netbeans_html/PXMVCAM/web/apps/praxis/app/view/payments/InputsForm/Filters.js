Ext.define('Ext.Praxis.view.payments.InputsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {   
            id: prototype.id + '-Filters3_1',
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults:  {
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
                    html: '<strong style="color:#000;">Processing Date </strong>',
                    align: 'left',
                    fieldStyle: 'text-align: left;',
                    padding: '8px 7px 0px 10px',
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
                    anchor: '100%',
                    listeners: {
                        change: 'cbxDateFromMonth_Change'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromDay',
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
                    anchor: '100%',
                    listeners: {
                        change: 'cbxDateFromMonth_Day'
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
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Create Date ',
                    id: prototype.id+'-txtDateField',
                    autoSelect: false,
                    format: 'Y/m/d',
                    invalidText: 'Type the date in the format: YYYY/MM/DD',
                    selectOnFocus: true,
                    enableKeyEvents: true,
                    minValue: new Date(1990, 00, 01),
                    maskRe: /[0-9/]/,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 150,
                    enforceMaxLength: true,
                    maxLength: 10,
                    width: 250,
                    hidden: true,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="color:red;font-size:13px;"></strong>  Country',
                    id: prototype.id+'-cmbCountry',           
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    autocomplete: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    width: 308,
                    labelWidth: 120,
                    hidden: true,
                    hiddenLabel: false
                },
                {xtype: 'tbspacer', width: 60},
                {
                    xtype: 'checkboxfield',
                    id: prototype.id + '-chkLOG',
                    width: 200,
                    boxLabel: '<b>Log</b>',
                    hidden: true,
                    inputValue: '0'
                }
            ]
        },
        {   
            id: prototype.id + '-Filters3_2',
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '10px 10px 0px 820px',
            layout: 'column',
            defaults:  {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true
            },
            items: [ 
                {
                    xtype: 'checkboxfield',
                    id: prototype.id + '-chkCITY',
                    width: 200,
                    boxLabel: '<b>Missing Countries</b>',
                    hidden: true,
                    inputValue: '1',
                    listeners: {
                        change: 'btn_ChangechkCITY'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Group By',
                    id: prototype.id+'-cmbVISTA',           
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    width: 170,
                    labelWidth: 70,
                    fieldStyle: 'text-align: left;',
                    hidden: false,
                    listeners:{
                        select: 'btnSearch_click',
//                        change: 'ChangeVista_clickHandler'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Source',
                    id: prototype.id+'-cmbFUENTE',
                    enableKeyEvents: true,                    
                    readOnly: false,
                    editable: false,
                    valueField: 'FUENTE',
                    displayField: 'FUENTE',
                    labelWidth: 50,
                    width: 160,
                    margin: '0px 0px 0px 20px',
                    hidden: false,
                    fieldStyle: 'text-align: left;',
                    emptyText: 'All',
                    queryMode: 'local',
                    triggerAction: 'all',
                    listeners:{
                        select: 'btnSearch_click'
                    }
                }           
            ]
        } 

    ]
});
