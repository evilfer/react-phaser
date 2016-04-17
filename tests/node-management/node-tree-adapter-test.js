"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var createNativeImpl = require('../../src/node-management/node-tree-adapter');

describe('node tree adapter', function () {

    var nodes, nativeImpl;

    beforeEach(function () {
        nodes = {
            components: {
                mount: sinon.spy(),
                childrenMount: sinon.spy(),
                update: sinon.spy(),
                unmount: sinon.spy()
            },
            transaction: {}
        };
        nativeImpl = createNativeImpl(nodes);
    });

    it('should mount root node', function () {
        var node = nativeImpl.components.mount(1, 'a', {}, null);

        expect(node).to.deep.eql({
            id: 1,
            tag: 'a',
            props: {},
            parent: null,
            children: [],
            initialized: false
        });

        expect(nodes.components.mount).to.have.been.calledOnce;
        expect(nodes.components.mount).to.have.been.calledWith({
            id: 1,
            tag: 'a',
            props: {},
            parent: null,
            children: [],
            initialized: false
        });
    });

    it('should mount child root node', function () {
        var a = nativeImpl.components.mount(1, 'a', {}, null),
            b = nativeImpl.components.mount(2, 'b', {}, a);

        expect(a).to.deep.eql({
            id: 1,
            tag: 'a',
            props: {},
            parent: null,
            children: [2],
            initialized: false
        });

        expect(b).to.deep.eql({
            id: 2,
            tag: 'b',
            props: {},
            parent: 1,
            children: [],
            initialized: false
        });

        expect(nodes.components.mount).to.have.been.calledTwice;
        expect(nodes.components.mount.getCall(0)).to.have.been.calledWith(a);
        expect(nodes.components.mount.getCall(1)).to.have.been.calledWith(b);
    });

    it('should notify after children mounted', function () {
        var a = nativeImpl.components.mount(1, 'a', {}, null),
            b = nativeImpl.components.mount(2, 'b', {}, a);

        nativeImpl.components.childrenMount(a);


        expect(nodes.components.childrenMount).to.have.been.calledOnce;
        expect(nodes.components.childrenMount).to.have.been.calledWith(a);
    });

    it('should notify node update', function () {
        var a = nativeImpl.components.mount(1, 'a', {p: 0}, null);
        nativeImpl.components.update(a, {p: 1}, a.props);

        expect(nodes.components.update).to.have.been.calledOnce;
        expect(nodes.components.update).to.have.been.calledWith(a, {p: 0});
        expect(a.props).to.eql({p: 1});
    });

    it('should unmount node from tree', function () {
        var a = nativeImpl.components.mount(1, 'a', {}, null),
            b = nativeImpl.components.mount(2, 'b', {}, a);

        expect(a.children).to.eql([2]);

        nativeImpl.components.unmount(b);

        expect(a.children).to.eql([]);

        expect(nodes.components.unmount).to.have.been.calledOnce;
        expect(nodes.components.unmount).to.have.been.calledWith(b);
    });
});
