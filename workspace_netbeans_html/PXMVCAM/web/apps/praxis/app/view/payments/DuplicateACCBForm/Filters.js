Ext.define('Ext.Praxis.view.payments.DuplicateACCBForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {   
            xtype: 'form',
            id: prototype.id + '-contFilter',
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
                hidden: false,
            },
            items: [
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Issue Date</strong>',
                    align: 'left',
                    fieldStyle: 'text-align: left;',
                    padding: '8px 30px 0px 10px',
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
                    labelWidth: 50,
                    width: 140,
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
                    id: prototype.id + '-cmbDateFromDay',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    valueField: 'code', displayField: 'name',
                    emptyText: 'All',
                    width: 60,
                    typeAhead: true,                            
                    listeners: {
                        change: 'onFromDayChange',                                
                        keypress: 'onTextKeypress'
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
                    labelWidth: 50,
                    width: 140,
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
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    valueField: 'code', displayField: 'name',
                    emptyText: 'All',
                    width: 60,
                    typeAhead: true,
                    listeners: {
                        change: 'onToDayChange',
                        keypress: 'onTextKeypress'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Country',
                    id: prototype.id+'-cmbCOUNTRY',   
                    queryMode: 'local',
                    valueField: 'A006PAIS',
                    displayField: 'A006NOMBRE',
                    width: 250,
                    labelWidth: 90,
                    selectOnFocus: true,
                    listConfig: {minWidth: 200},
                    fieldStyle: 'text-align: left;'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Document Type',
                    id: prototype.id+'-cmbTDOC',
                    queryMode: 'local',
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 130,
                    width: 240,
                    fieldStyle: 'text-align: left;'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Source Code',
                    id: prototype.id+'-cmbFTEA',
                    queryMode: 'local',
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    labelWidth: 110,
                    width: 220,
                    fieldStyle: 'text-align: left;'
                } 
            ]
        }
        ,
        {   
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '10px 2px 10px 2px',
            layout: 'column',
            defaults:  {
//                labelStyle: 'font-weight:bold;',
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
                    xtype: 'textfield',
                    fieldLabel: 'Authorization Code',
                    id: prototype.id+'-txtAGENTE',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength:10,
                    labelWidth: 120,
                    width: 280,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'eventKey'
                    },
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ticket:',
                    id: prototype.id+'-txtTICKET',
                    margin: '0 0 0 9',
                    allowBlank: true,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    maxLength:13,
                    labelWidth: 146,
                    width: 340,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'BuscarTKT_keyDownHandler'
                    }
                },
                {
                    xtype: 'checkboxfield',
                    id: prototype.id + '-chkDpli',
                    labelStyle: 'font-weight:bold;',
                    margin: '0 20 0 53',
                    width: 80,
                    boxLabel: '<b>Duplicate</b>',
                    inputValue: '1',
                    listeners:{
                        change: 'btnSearch_click'
                    }
                }
            ]
        } 

    ]
});
