@isTest
public with sharing class MyNewClassTest {
    @isTest
    public static void testDummy() {
        Test.startTest();
        String str = MyNewClass.dummyMethod();
        Test.stopTest();
        System.assertEquals(str, 'dummyMethodd');
    }
}
