/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.AgentsMasterFileForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1300,
                height: 500,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    padding: '20 0 0 0',
                    id: prototype.id + '-gridData',
                    height: 550,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'

                        },
                        items: [
                            {text: 'Nbr.', width: 60, dataIndex: 'pos'},
                            {text: 'Code', width: 70, dataIndex: 'A003KEY'},
                            {text: 'Type', width: 60, dataIndex: 'A003TIPO'},
                            {text: 'Channel', width: 60, dataIndex: 'A003CANAL'},
                            {text: 'User', width: 60, dataIndex: 'A003OPERA'}, 
                            {text: 'Base', width: 60, dataIndex: 'A003TRPM'},
                            {text: 'Legal Name', width: 300, dataIndex: 'A003KEY1',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['A003KEY1'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                     metaData.style = 'text-align :left ; margin-left : 3px ';
                                    return value;
                                }
                            },
                            {text: 'Country', width: 80, dataIndex: 'A003PSALF',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['strNomPais'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }
                            },
                            {text: 'State', width: 80, dataIndex: 'A003DEPART',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['A003DEPART'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }
                            },
                            {text: 'County', width: 100, dataIndex: 'A003PROVIN',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['A003PROVIN'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    return value;
                                }
                            },
                            {text: 'City',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    border: true
                                },
                                columns: [
                                    {text: 'name', width: 100, dataIndex: 'A003DISTRI',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['A003DISTRI'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                             metaData.style = 'text-align :left ; margin-left : 3px ';
                                            return value;
                                        }
                                    },
                                    {text: 'Code', width: 100, dataIndex: 'A003CIUDAD',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var tool = record.data['A003DISTRI'].trim();
                                            if (tool.length > 0) {
                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                            }
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {text: 'Zip Code', width: 100, dataIndex: 'A003ZIPCOD',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['A003ZIPCOD'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                    metaData.style = 'text-align :right ; margin-right : 3px ';
                                    return value;
                                }
                            },
                            {text: 'Sabre City', width: 100, dataIndex: 'A003SABCTY',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    var tool = record.data['A003SABCTY'].trim();
                                    if (tool.length > 0) {
                                        metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                    }
                                     
                                    return value;
                                }
                            },
                            {
                                sortable: false,
                                xtype: 'actioncolumn',
                                text: 'Edit',
                                width: 70,
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Edit',
                                        handler: 'onEditClick'
                                    }
                                ]
                            }


                        ]
                    }
                }
                ,
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1300,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

