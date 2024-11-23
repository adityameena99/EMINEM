import java.util.*;
public class K{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int arr[]={10,20,60,80,90,60};
        int fg=Math.max(arr[0], arr[1]);
        int sg=Math.min(arr[0], arr[1]);
        for (int i = 0; i < arr.length; i++) {
            if (arr[i]>fg) {
                sg=fg;
                fg=arr[i];
            }
            else if(arr[i]>sg) {
                sg=arr[i];
            }
        }
        System.out.println(sg);
    }
}