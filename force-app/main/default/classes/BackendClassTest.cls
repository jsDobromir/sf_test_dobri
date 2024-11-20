@isTest
public with sharing class BackendClassTest {
    @isTest
    public static void testMethod1() {
        Test.startTest();
        String str = BackendCLass.methodName();
        Test.stopTest();
        System.assertEquals(str, 'History Log');
    }
}
