/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.ZoneReviewForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
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
                width: 1600
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
                    style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Flight Date </strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
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
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 70,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbZona',
                            fieldLabel: 'Market',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'CCIA',
                            displayField: 'ZONA',
                            emptyText: 'All',
                            labelWidth: 80,
                            width: 160,
                            anchor: '100%'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCarrier',
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
                            width: 160,
                            anchor: '100%'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkOAL',
                            margin: '0 0 0 20',
                            width: 80,
                            boxLabel: '<b>OAL</b>',
                            inputValue: '1'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCountry',
                            fieldLabel: '',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'CCIA',
                            displayField: 'strDescripcion',
                            emptyText: 'All',
                            width: 200,
                            anchor: '100%'
                        }

                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: white',
                    id: prototype.id + '-panelPrinc',
                    border: true,
                    layout: 'column',
                    style: 'border-bottom: 3px #ffffff solid;border-left: 0px;',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '4px 7px 4px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgPRINC',
                            fieldLabel: 'Search By',
                            horizontal: true,
                            items: [
                                {boxLabel: '<strong >Flight and Pax   </strong>', name: 'rb'        , inputValue: 'btnFLI', width: 120, checked: true},
                                {boxLabel: '<strong >Fare </strong>', name: 'rb'                    , inputValue: 'btnFARE', width: 80},
                                {boxLabel: '<strong >Revenue per Hour </strong>', name: 'rb'        , inputValue: 'btnHOUR', width: 150},
                                {boxLabel: '<strong >Flight and Pax by Day of Week </strong>', name: 'rb', inputValue: 'btnPAXFLI', width: 220},
                                {boxLabel: '<strong >City Pair </strong>', name: 'rb'               , inputValue: 'btnCITY', width: 100},                             
                                {boxLabel: '<strong >City Pair by Day of Week</strong>', name: 'rb', inputValue: 'btnCITYday', width: 200}
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelSelectFli',
                    border: true,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '4px 7px 4px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgSELEC',
                            fieldLabel: 'Selected By',
                            horizontal: false,
                            items: [
                                {boxLabel: '<strong style="color:#046aaa" >Pax   </strong>', name: 'rb', inputValue: 'rbPAX', width: 100, checked: true},
                                {boxLabel: '<strong style="color:#046aaa" >Flight </strong>', name: 'rb', inputValue: 'rbFLIGHT', width: 100},
                                {boxLabel: '<strong style="color:#046aaa" >Pax/Flight </strong>', name: 'rb', inputValue: 'rbPAXFLI', width: 100, id: prototype.id+'-rbgSELEC-item'}

                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelSelectFARE',
                    border: true,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '4px 7px 4px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgSelfare',
                            fieldLabel: 'Selected By',
                            horizontal: false,
                            items: [
                                {boxLabel: '<strong style="color:#046aaa" >Fare   </strong>', name: 'rb', inputValue: 'rbFa', width: 100, checked: true},
                                {boxLabel: '<strong style="color:#046aaa" >Fare by Day of week </strong>', name: 'rb', inputValue: 'rbFaDay', width: 150},
                                {boxLabel: '<strong style="color:#046aaa" >Yield </strong>', name: 'rb', inputValue: 'rbYield', width: 100}

                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelSelectCITY',
                    border: true,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '4px 7px 4px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-rbgSelCity',
                            fieldLabel: 'Selected By',
                            horizontal: false,
                            items: [
                                {boxLabel: '<strong style="color:#046aaa" >PAX   </strong>', name: 'rb', inputValue: 'rbPAXcity', width: 100, checked: true},
                                {boxLabel: '<strong style="color:#046aaa" >Flight </strong>', name: 'rb', inputValue: 'rbFLIGHTcity', width: 100},
                                {boxLabel: '<strong style="color:#046aaa" >Pax/Flight </strong>', name: 'rb', inputValue: 'rbPAXFLIcity', width: 100,id: prototype.id+'-rbgSelCity-item'}

                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

