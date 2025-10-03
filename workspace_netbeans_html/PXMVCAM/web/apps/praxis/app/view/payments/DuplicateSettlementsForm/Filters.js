Ext.define('Ext.Praxis.view.payments.DuplicateSettlementsForm.Filters', {
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
                fieldStyle: 'text-align: center',
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
                    width: 190,
                    labelWidth: 95,
                    xtype: 'combo', 
                    id: prototype.id + '-typeClient',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    selectOnFocus: true,
                    caseSensitive: false,
                    autoSelect: true,
                    editable: true,
                    disabled: true,
                    listConfig: {maxHeight: 130},
                    typeAhead: true,
                    valueField: 'code',
                    displayField: 'name',
                    enableKeyEvents: true,
                    triggerAction: 'all',
                    value: '134',
                    margin: '0 10 0 0',
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
                {
                    fieldLabel: 'From',
                    xtype: 'combo',
                    width: 105,
                    labelWidth: 38,
                    labelAlign: 'right',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    id: prototype.id + '-cmbDateFromYear',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    width: 55,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    id: prototype.id + '-cmbDateFromMonth',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 0,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    width: 50,
                    style: 'margin-right:10px;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    id: prototype.id + '-cmbDateFromDay',
                    queryMode: 'local',
                    triggerAction: 'all',
//                    disabled: true,
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 0,
                    anchor: '100%',
                    listConfig: {maxHeight: 111, minWidth: 60}
                },
                // To Year
                {
                    fieldLabel: 'To',
                    xtype: 'combo',
                    width: 85,
                    labelWidth: 20,
                    labelAlign: 'right',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    id: prototype.id + '-cmbDateToYear',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    width: 55,
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    id: prototype.id + '-cmbDateToMonth',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 0,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    width: 50,
                    style: 'margin-right:10px;',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    id: prototype.id + '-cmbDateToDay',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
//                    disabled: true,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 0,
                    anchor: '100%',
                    listConfig: {maxHeight: 111, minWidth: 60},
                    margin: '0 10 0 0'
                },
                // CODEBANK
                {
                    xtype: 'textfield',
                    id: prototype.id + '-txtCodeBank',
                    fieldLabel: 'Codebank',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 4, 
                    labelWidth: 68,
                    width: 120,
                    enableKeyEvents: true,
                    listeners: {
//                        keypress: 'filterCodeBank'
                    },
                    margin: '0 10 0 0'
                },
                // NEGOCIO
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbNEGOC',
                    fieldLabel: 'Business',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
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
                    anchor: '100%',
                    margin: '0 10 0 0'
                },
                //SCARCOD
                 {
                    xtype: 'combo',
                    id: prototype.id + '-cmbCARDTYPE',
                    fieldLabel: 'CC Type',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'CODE',
                    displayField: 'NAME',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 200,
                    anchor: '100%',
                    margin: '0 10 0 0'
                },
                //STATUS
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbSTATUS',
                    fieldLabel: 'Status',
                    labelAlign: 'right',
                    queryMode: 'local',
                    hidden:true,
                    editable: false,
                    triggerAction: 'all',
                    labelStyle: 'text-align: left; font-size: 14px;',
                    fieldStyle: 'text-align: left; font-size: 14px;',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    valueField: 'value',
                    displayField: 'description',
                    labelWidth: 45,
                    width: 200,
                    anchor: '100%',
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    padding: '0 10 5 10',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Duplicates',
                            margin: '0 5 0 0',
                            width: 60,
                            id: prototype.id + '-COLTACA'
                        },
                        {
                            xtype: 'component',
                            id: prototype.id + '-btnToggleSwitchTACA',
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
                            tooltip: 'Export to Report',
                            listeners: {
                                change: 'chgBashTACA',
                                click: 'chgBashTACA'
                            }
                        },
                        {
                            xtype: 'label',
                            text: 'Removed',
                            margin: '0 0 0 5',
                            width: 60,
                            id: prototype.id + '-EXTACA'
                        },
                    ]
                },
                //BOTONES
                {
                        xtype: 'button',
                        id: prototype.id + '-btn_AllInfo',
                        margin: '1 0 0 0',
                        html: '<strong style="color:white;">ALL PROCESS</strong>',
                        style: 'background:#24678D;color:white;font-weight:bold;',
                        border: false,
                        listeners: {
                            click: 'deleteAllSettlements'
                        },
                        margin: '0 10 0 0'
                    },
                {
                    xtype: 'button',
                    id: prototype.id + '-btn_SelectAllInfo',
                    margin: '1 0 0 0',
                    html: '<strong style="color:white;">PROCESS</strong>',
                    style: 'background:#24678D;color:white;font-weight:bold;',
                    border: false,
                    listeners: {
                        click: 'deleteSettlementsSelected'
                    }
                },
                 {
                        xtype: 'button',
                        id: prototype.id + '-btn_AllInfoReverse',
                        margin: '1 0 0 0',
                        html: '<strong style="color:white;">ALL PROCESS</strong>',
                        style: 'background:#D2691E;color:white;font-weight:bold;',
                        border: false,
                        hidden: true,
                        listeners: {
                            click: 'reverseAllSettlements'
                        },
                        margin: '0 10 0 0'
                    },
                {
                    xtype: 'button',
                    id: prototype.id + '-btn_SelectAllInfoReverse',
                    margin: '1 0 0 0',
                    html: '<strong style="color:white;">PROCESS</strong>',
                    style: 'background:#D2691E;color:white;font-weight:bold;',
                    border: false,
                    hidden: true,
                    listeners: {
                        click: 'reverseSettlementsSelected'
                    }
                },
            ]
        }
    ]
});
