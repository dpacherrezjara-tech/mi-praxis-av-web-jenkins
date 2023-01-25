///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.PassengerStatisticsForm.Filters', {
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
            padding: '0px 5px 1px 0px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 0px',
                anchor: '100%',
                width: 1350
            },
            items: [
                /**
                 *  PANEL DATE
                 * 
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelDateFilters',
                    border: false,
                    //style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [                       
                         {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTipoFecha',
                            fieldLabel: '',                           
                            queryMode: 'local',
                            editable: false,
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 100,
                            anchor: '100%'
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
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 50,
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
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
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
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            fieldLabel: 'To',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 30,
                            width: 120,
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
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
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
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFlagFlown',
                            fieldLabel: 'Flag Flown',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 80,
                            width: 160,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxCarrier',
                            fieldLabel: 'Carrier',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 60,
                            width: 130,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCUTP',
                            fieldLabel: 'Currency',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 70,
                            width: 130,
                            anchor: '100%'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFlight',
                            required: true,
                            fieldLabel: '<strong style="color:#000;">Flight Number</strong>',
                            width: 160,
                            labelWidth: 110,
                            enableKeyEvents: true,
                            labelAlign: 'right',
                            enforceMaxLength: true,
                            maxLength: 4,
                            maskRe: /[0-9]/
                        }
                    ]
                }

            ]
        }
    ]
});



//Ext.define('Ext.Praxis.view.flown.PassengerStatisticsForm.Filters', {
//    extend: 'Ext.form.Panel',
//    alias: 'widget.' + prototype.id + '-filters',
//    border: true,
//    bodyStyle: 'background-color: #E3EAF9;',
//    padding: '2px 0px 1px 0px',
//    layout: 'column',
//    items: [
//        {
//            xtype: 'form',
//            border: false,
//            bodyStyle: 'background: transparent',
//            padding: '2px 5px 1px 5px',
//            layout: 'column',
//            defaults: {
//                labelStyle: 'font-weight:bold;',
//                fieldStyle: 'text-align: center;',
//                padding: '5px 1px 5px 1px',
//                anchor: '100%',
//                hiddenLabel: false,
//                labelAlign: 'right',
//                xtype: 'textfield',
//                hidden: false,
//                selectOnFocus: true,
//                enableKeyEvents: true,
//                enforceMaxLength: true
//            },
//            items: [               
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateFromYear',
//                    fieldLabel: 'From',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    editable: false,
//                    triggerAction: 'all',
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    labelWidth: 60,
//                    width: 150,
//                    anchor: '100%'
//                },
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateFromMonth',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    editable: false,
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    labelWidth: 0,
//                    width: 70,
//                    anchor: '100%'
//                },
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateFromDay',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    editable: false,
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    labelWidth: 0,
//                    width: 70,
//                    anchor: '100%'
//                },
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateToYear',
//                    fieldLabel: 'To',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    editable: false,
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    labelWidth: 60,
//                    width: 150,
//                    anchor: '100%'
//                },
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateToMonth',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    editable: false,
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    labelWidth: 0,
//                    width: 70,
//                    anchor: '100%'
//                },
//                {
//                    xtype: 'combo',
//                    id: prototype.id + '-cmbDateToDay',
//                    labelAlign: 'right',
//                    queryMode: 'local',
//                    triggerAction: 'all',
//                    editable: false,
//                    autoSelect: false,
//                    enableKeyEvents: true,
//                    caseSensitive: true,
//                    valueField: 'code',
//                    displayField: 'name',
//                    emptyText: 'All',
//                    labelWidth: 0,
//                    width: 70,
//                    anchor: '100%'
//                },
//                {
//                    xtype: 'textfield',
//                    id: prototype.id + '-txtSearch',
//                    required: true,
//                    fieldLabel: '<strong style="color:#000;">Flight Number</strong>',
//                    width: 190,
//                    labelWidth: 140,
//                    enableKeyEvents: true,
//                    labelAlign: 'right',
//                    enforceMaxLength: true,
//                    maxLength: 4,
//                    maskRe: /[0-9]/
//                },
//                {
//                    xtype: 'textfield',
//                    id: prototype.id + '-txtTicket',
//                    fieldLabel: '<strong style="color:#000;">Ticket</strong>',
//                    labelAlign: 'right',
//                    labelWidth: 80,
//                    width: 220,
//                    maxLength: 13,
//                    enforceMaxLength: true,
//                    maskRe: /[0-9]/
//                }              
//               
//
//            ]
//        }
//    ]
//});
//
