/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.salesaudit.ControlFiguresForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAEF;',
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
                width: 1700
            },
            items: [
                /**
                 *  Panel 01
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters1',
                    border: false,
                    //style: 'border-bottom: 2px #ffffff solid;',
                    layout: 'hbox',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        
                        {
                            xtype: 'label',
                            text: 'Search By',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'

                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            style: 'font-weight:bold;color:red;',
                            padding: '10 5 5 5'

                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-ComboBy',
                            fieldStyle: 'text-align: left;',
                            editable: false,
                            fieldLabel: '',
                            width: 110,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            id: prototype.id + '-txtFilterDateFrom',
                            fieldStyle: 'text-align:center;color:blue;',
                            maskRe: /[0-9]/,
                            fieldLabel: 'From',
                            enforceMaxLength: true,
                            width: 130,
                            labelWidth: 40
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            id: prototype.id + '-txtFilterDateTo',
                            fieldStyle: 'text-align:center;color:blue;',
                            maskRe: /[0-9]/,
                            fieldLabel: 'To',
                            enforceMaxLength: true,
                            width: 120,
                            labelWidth: 30
                        },
                        {xtype: 'tbspacer', width: 1140},
                        /*{
                            xtype: 'button',
                            id: prototype.id + '-btnLoad0',
                            text: '<b>Load<b>',
                            icon: 'resources/img/botones/process_load.png',
                            tooltip: 'Load'
                        }*/
                    ]
                }
//                {
//                    xtype: 'panel',
//                    bodyStyle: 'background: transparent',
//                    id: prototype.id + '-panelFilters2',
//                    border: false,
//                    layout: 'column',
//                    defaults: {
//                        // labelStyle: 'font-weight:bold;',
//                        fieldStyle: 'text-align: center;',
//                        padding: '8px 7px 8px 10px',
//                        anchor: '100%'
//                    },
//                    items: [
//                        {
//                            xtype: 'label',
//                            text: 'Ticket',
//                            width: 55,
//                            style: 'font-weight:bold;',
//                            padding: '10 5 5 5'
//
//                        },
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id + '-txtTKT',
//                            required: true,
//                            readOnly: false,
//                            fieldLabel: '',
//                            width: 120,
//                            labelWidth: 0,
//                            fieldStyle: 'text-align: center;',
//                            labelAlign: 'left',
//                            maxLength: 13,
//                            enforceMaxLength: true,
//                            maskRe: /[0-9]/
//                        }
//
//                    ]
//                }
            ]
        }
    ]
});



