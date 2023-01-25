/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.view.flown.ZoneMasterFileForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.flown-zone-master-file-filters',
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
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Search By',
                    id: 'vZoneMasterFile-cbmFilterType',
                    store: Ext.create('Ext.Praxis.store.flown.ZoneMasterFile.FilterBys01'),
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    value: '1', //Inicializa el combo con el elemento que tiene como valor 1 su field
                    emptyText: '[select]',
                    labelWidth: 85,
                    width: 200,
                    hidden: false,
                    hiddenLabel: false
                }
                ,
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="color:red;font-size:13px;">*</strong> Airport Code',
                    id: 'vZoneMasterFile-cmbFilterAirportCode',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    autocomplete: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'A1007CTATO',
                    displayField: 'A1007NOMBR',
                    emptyText: 'All',
                    width: 350,
                    anyMatch: false,
                    labelWidth: 120,
                    hidden: false,
                    hiddenLabel: false
                },
                {
                    xtype: 'checkboxfield',
                    id: 'vZoneMasterFile-chkEmpty',
                    margin: '0 5 0 5',
                    width: 120,
                    boxLabel: 'Empty Zones',
                    inputValue: '1',
                    hidden: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="color:red;font-size:13px;">*</strong>Origin City Code:',
                    id: 'vZoneMasterFile-cmbFilterOriginCity',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    autocomplete: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'A1007CTATO',
                    displayField: 'A1007NOMBR',
                    emptyText: 'All',
                    width: 300,
                    anyMatch: false,
                    labelWidth: 130,
                    hidden: true,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="color:red;font-size:13px;">*</strong>Destination City Code:',
                    id: 'vZoneMasterFile-cmbFilterDestinationCity',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    autocomplete: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'A1007CTATO',
                    displayField: 'A1007NOMBR',
                    emptyText: 'All',
                    width: 300,
                    anyMatch: false,
                    labelWidth: 160,
                    hidden: true,
                    hiddenLabel: false
                },
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="color:red;font-size:13px;">*</strong>Zone Code:',
                    id: 'vZoneMasterFile-cmbZone',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    autocomplete: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: true,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 250,
                    anyMatch: false,
                    labelWidth: 90,
                    hidden: true,
                    hiddenLabel: false
                }
            ]
        }
    ]
});

